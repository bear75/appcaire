-- Create organizations table
CREATE TABLE IF NOT EXISTS "organization" (
  "id" UUID PRIMARY KEY,
  "name" TEXT NOT NULL,
  "trial_expiration_date" TIMESTAMP,
  "status" TEXT DEFAULT 'trial',
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS "organization_name_idx" ON "organization" ("name");
CREATE INDEX IF NOT EXISTS "organization_status_idx" ON "organization" ("status"); 