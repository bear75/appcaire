CREATE TABLE IF NOT EXISTS "organization" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password_hash" text NOT NULL,
  "role" text NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "status" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "employees" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "email" text,
  "phone" text,
  "role" text NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "user_id" uuid REFERENCES "users"("id"),
  "status" text NOT NULL,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "clients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "email" text,
  "phone" text,
  "address" text NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "status" text NOT NULL,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "vehicles" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "type" text NOT NULL,
  "capacity" integer NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "status" text NOT NULL,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "schedules" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "employee_id" uuid NOT NULL REFERENCES "employees"("id"),
  "vehicle_id" uuid REFERENCES "vehicles"("id"),
  "status" text NOT NULL,
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "schedule_metrics" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "schedule_id" uuid NOT NULL REFERENCES "schedules"("id"),
  "metric_type" text NOT NULL,
  "value" numeric NOT NULL,
  "unit" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "schedule_solutions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "schedule_id" uuid NOT NULL REFERENCES "schedules"("id"),
  "solution_data" jsonb NOT NULL,
  "score" numeric NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp,
  "selected_at" timestamp
);

CREATE TABLE IF NOT EXISTS "employee_shifts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "employee_id" uuid NOT NULL REFERENCES "employees"("id"),
  "schedule_id" uuid NOT NULL REFERENCES "schedules"("id"),
  "vehicle_id" uuid REFERENCES "vehicles"("id"),
  "start_time" timestamp NOT NULL,
  "end_time" timestamp NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "shift_templates" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "name" text NOT NULL,
  "start_time" time NOT NULL,
  "end_time" time NOT NULL,
  "days_of_week" text[] NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "visit_requirements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "client_id" uuid NOT NULL REFERENCES "clients"("id"),
  "visit_duration" interval NOT NULL,
  "preferred_time_windows" jsonb NOT NULL,
  "required_skills" text[] NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "constraint_definitions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "name" text NOT NULL,
  "description" text,
  "constraint_type" text NOT NULL,
  "parameters" jsonb NOT NULL,
  "priority" integer NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "constraint_values" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "constraint_id" uuid NOT NULL REFERENCES "constraint_definitions"("id"),
  "entity_type" text NOT NULL,
  "entity_id" uuid NOT NULL,
  "value" jsonb NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "analytics" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL REFERENCES "organization"("id"),
  "metric_type" text NOT NULL,
  "metric_value" numeric NOT NULL,
  "dimension" text NOT NULL,
  "period_start" timestamp NOT NULL,
  "period_end" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
); 