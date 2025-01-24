-- Migration: Clean Organization Table
-- Description: Recreates the organization table without Stripe fields
-- Author: Björn Evers
-- Date: 2024-01-23

-- Drop any existing Stripe-related indexes first
DROP INDEX IF EXISTS public.stripe_customer_id_idx;
DROP INDEX IF EXISTS stripe_customer_id_idx;

-- Drop the Stripe column if it exists
ALTER TABLE public.organization DROP COLUMN IF EXISTS stripe_customer_id;

-- Drop and recreate the organization table without Stripe fields
DROP TABLE IF EXISTS public.organization CASCADE;

CREATE TABLE IF NOT EXISTS public.organization (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    trial_expiration_date timestamp with time zone,
    status text DEFAULT 'ACTIVE'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE public.organization ENABLE ROW LEVEL SECURITY;

CREATE POLICY organization_tenant_isolation ON public.organization
    USING (true)
    WITH CHECK (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_organization_updated_at ON public.organization;

CREATE TRIGGER update_organization_updated_at
    BEFORE UPDATE ON public.organization
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column(); 