CREATE TABLE IF NOT EXISTS "constraint_definitions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"priority" text NOT NULL,
	"weight" integer NOT NULL,
	"category" text NOT NULL,
	"is_system" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "constraint_values" (
	"id" uuid PRIMARY KEY NOT NULL,
	"constraint_definition_id" uuid,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"value" json NOT NULL,
	"override_weight" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_shifts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employee_id" uuid,
	"shift_template_id" uuid,
	"date" timestamp NOT NULL,
	"vehicle_id" uuid,
	"actual_start" timestamp,
	"actual_end" timestamp,
	"status" text DEFAULT 'PLANNED',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule_metrics" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid,
	"schedule_date" timestamp NOT NULL,
	"metric_type" text NOT NULL,
	"value" numeric(10, 2) NOT NULL,
	"constraint_impacts" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule_solutions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid,
	"run_date" timestamp NOT NULL,
	"input_data" json NOT NULL,
	"output_solution" json NOT NULL,
	"score" json NOT NULL,
	"status" text DEFAULT 'RUNNING',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shift_templates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid,
	"name" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"break_windows" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"capacity" integer,
	"status" text DEFAULT 'ACTIVE',
	"location" "point",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visit_requirements" (
	"id" uuid PRIMARY KEY NOT NULL,
	"client_id" uuid,
	"service_type" text NOT NULL,
	"duration" interval NOT NULL,
	"frequency" json,
	"priority" integer DEFAULT 1,
	"time_windows" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "constraint_definitions" ADD CONSTRAINT "constraint_definitions_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "constraint_values" ADD CONSTRAINT "constraint_values_constraint_definition_id_constraint_definitions_id_fk" FOREIGN KEY ("constraint_definition_id") REFERENCES "public"."constraint_definitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_shift_template_id_shift_templates_id_fk" FOREIGN KEY ("shift_template_id") REFERENCES "public"."shift_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_shifts" ADD CONSTRAINT "employee_shifts_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_metrics" ADD CONSTRAINT "schedule_metrics_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_solutions" ADD CONSTRAINT "schedule_solutions_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shift_templates" ADD CONSTRAINT "shift_templates_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visit_requirements" ADD CONSTRAINT "visit_requirements_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
