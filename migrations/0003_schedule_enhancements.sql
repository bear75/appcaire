-- Migration: Schedule Enhancements
-- Description: Adds support for multi-employee scheduling and eCare-Timefold integration
-- Author: Björn Evers
-- Date: 2024-01-23

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop any existing Stripe-related indexes if they exist
DO $$ 
DECLARE
  index_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'public' 
    AND indexname = 'stripe_customer_id_idx'
  ) INTO index_exists;

  IF index_exists THEN
    EXECUTE 'ALTER TABLE organization DROP CONSTRAINT IF EXISTS stripe_customer_id_idx';
    EXECUTE 'DROP INDEX IF EXISTS public.stripe_customer_id_idx';
  END IF;
END $$;

-- Ensure organization table exists with required columns (without Stripe fields)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'organization_status') THEN
    CREATE TYPE organization_status AS ENUM ('trial', 'active', 'suspended');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'organization') THEN
    CREATE TABLE organization (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      trial_expiration_date TIMESTAMP WITH TIME ZONE,
      status organization_status DEFAULT 'trial',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  END IF;
END $$;

-- Step 1: Modify schedules table
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schedules' AND column_name = 'employee_id') THEN
    ALTER TABLE schedules DROP COLUMN employee_id;
  END IF;
END $$;

ALTER TABLE schedules
  ADD COLUMN IF NOT EXISTS schedule_type TEXT CHECK (schedule_type IN ('MANUAL', 'IMPORTED', 'OPTIMIZED', 'PUBLISHED')) DEFAULT 'MANUAL',
  ADD COLUMN IF NOT EXISTS ecare_task_id TEXT,
  ADD COLUMN IF NOT EXISTS timefold_score JSONB,
  ADD COLUMN IF NOT EXISTS optimization_metrics JSONB;

-- Step 2: Create schedule_assignments table
CREATE TABLE IF NOT EXISTS schedule_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id),
  assignment_type TEXT CHECK (assignment_type IN ('primary', 'assistant')) DEFAULT 'primary',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_schedule_assignments_schedule_id ON schedule_assignments(schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_assignments_employee_id ON schedule_assignments(employee_id);

-- Step 3: Create ecare_integration table
CREATE TABLE IF NOT EXISTS ecare_integration (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organization(id),
  import_source TEXT CHECK (import_source IN ('JSON_UPLOAD', 'DIRECT_API')) NOT NULL,
  imported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  raw_data JSONB NOT NULL,
  status TEXT CHECK (status IN ('PENDING', 'PROCESSED', 'FAILED')) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index for organization lookups
CREATE INDEX IF NOT EXISTS idx_ecare_integration_org_id ON ecare_integration(organization_id);

-- Step 4: Create schedule_comparisons table
CREATE TABLE IF NOT EXISTS schedule_comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organization(id),
  manual_schedule_id UUID NOT NULL REFERENCES schedules(id),
  optimized_schedule_id UUID NOT NULL REFERENCES schedules(id),
  comparison_metrics JSONB NOT NULL,
  status TEXT CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for schedule comparison lookups
CREATE INDEX IF NOT EXISTS idx_schedule_comparisons_org_id ON schedule_comparisons(organization_id);
CREATE INDEX IF NOT EXISTS idx_schedule_comparisons_manual_id ON schedule_comparisons(manual_schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_comparisons_optimized_id ON schedule_comparisons(optimized_schedule_id);

-- Step 5: Modify visit_requirements table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'visit_requirements') THEN
    CREATE TABLE visit_requirements (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      client_id UUID NOT NULL REFERENCES clients(id),
      service_type TEXT NOT NULL,
      duration INTERVAL NOT NULL,
      frequency JSONB,
      priority INTEGER DEFAULT 1,
      time_windows JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  END IF;
END $$;

ALTER TABLE visit_requirements
  ADD COLUMN IF NOT EXISTS ecare_visit_type TEXT,
  ADD COLUMN IF NOT EXISTS ecare_requirements JSONB,
  ADD COLUMN IF NOT EXISTS required_employee_count INTEGER DEFAULT 1;

-- Step 6: Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to new tables
DROP TRIGGER IF EXISTS update_schedule_assignments_updated_at ON schedule_assignments;
CREATE TRIGGER update_schedule_assignments_updated_at
  BEFORE UPDATE ON schedule_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ecare_integration_updated_at ON ecare_integration;
CREATE TRIGGER update_ecare_integration_updated_at
  BEFORE UPDATE ON ecare_integration
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_schedule_comparisons_updated_at ON schedule_comparisons;
CREATE TRIGGER update_schedule_comparisons_updated_at
  BEFORE UPDATE ON schedule_comparisons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Add RLS policies for multi-tenant security
ALTER TABLE schedule_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecare_integration ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_comparisons ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS schedule_assignments_org_isolation ON schedule_assignments;
DROP POLICY IF EXISTS ecare_integration_org_isolation ON ecare_integration;
DROP POLICY IF EXISTS schedule_comparisons_org_isolation ON schedule_comparisons;

-- Create policies for schedule_assignments
CREATE POLICY schedule_assignments_org_isolation ON schedule_assignments
  USING (
    schedule_id IN (
      SELECT id FROM schedules WHERE organization_id = current_setting('app.current_org_id')::uuid
    )
  );

-- Create policies for ecare_integration
CREATE POLICY ecare_integration_org_isolation ON ecare_integration
  USING (organization_id = current_setting('app.current_org_id')::uuid);

-- Create policies for schedule_comparisons
CREATE POLICY schedule_comparisons_org_isolation ON schedule_comparisons
  USING (organization_id = current_setting('app.current_org_id')::uuid);

-- Step 8: Comments for documentation
COMMENT ON TABLE schedule_assignments IS 'Links schedules to multiple employees, supporting multi-caregiver visits';
COMMENT ON TABLE ecare_integration IS 'Tracks eCare data imports and their processing status';
COMMENT ON TABLE schedule_comparisons IS 'Stores comparisons between manual and AI-optimized schedules';
COMMENT ON COLUMN schedules.schedule_type IS 'Indicates if schedule is MANUAL, IMPORTED, OPTIMIZED, or PUBLISHED';
COMMENT ON COLUMN visit_requirements.required_employee_count IS 'Number of employees required for this visit type'; 