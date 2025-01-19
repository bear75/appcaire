-- Add trial_expiration_date to organization table
ALTER TABLE "organization"
ADD COLUMN IF NOT EXISTS "trial_expiration_date" timestamp; 