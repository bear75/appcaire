import {
  bigint,
  boolean,
  integer,
  interval,
  json,
  numeric,
  pgTable,
  point,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Organizations table
export const organizationSchema = pgTable(
  'organization',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    trialExpirationDate: timestamp('trial_expiration_date'),
    status: text('status').$type<'trial' | 'active' | 'suspended'>().default('trial'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Users table
export const userSchema = pgTable(
  'users',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    role: text('role').$type<'super_admin' | 'admin' | 'scheduler' | 'employee' | 'client'>().notNull(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    status: text('status').$type<'active' | 'trial' | 'suspended' | 'deactivated'>().default('trial'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Employees table
export const employeeSchema = pgTable(
  'employees',
  {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => userSchema.id),
    employeeCode: text('employee_code').unique(),
    skills: json('skills'),
    availability: json('availability'),
    transportMode: text('transport_mode').$type<'driver' | 'walker'>(),
    hourlyRate: bigint('hourly_rate', { mode: 'number' }),
    gender: text('gender').$type<'male' | 'female' | 'other'>(),
    contract: text('contract').$type<'fixed' | 'hourly'>(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Clients table
export const clientSchema = pgTable(
  'clients',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    name: text('name').notNull(),
    gender: text('gender').$type<'male' | 'female' | 'other'>(),
    address: text('address'),
    encryptedLatitude: text('encrypted_latitude'), // Use appropriate encryption helper
    encryptedLongitude: text('encrypted_longitude'), // Use appropriate encryption helper
    preferences: json('preferences'),
    specialNeeds: json('special_needs'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Schedules table
export const scheduleSchema = pgTable(
  'schedules',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    clientId: uuid('client_id').references(() => clientSchema.id),
    startTime: timestamp('start_time', { mode: 'date' }).notNull(),
    endTime: timestamp('end_time', { mode: 'date' }).notNull(),
    status: text('status').$type<'scheduled' | 'completed' | 'canceled'>().default('scheduled'),
    scheduleType: text('schedule_type').$type<'MANUAL' | 'IMPORTED' | 'OPTIMIZED' | 'PUBLISHED'>().default('MANUAL'),
    eCareTaskId: text('ecare_task_id'), // Reference to original eCare task
    timefoldScore: json('timefold_score'), // Store optimization score
    optimizationMetrics: json('optimization_metrics'), // Store detailed metrics
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Schedule Assignments table
export const scheduleAssignmentSchema = pgTable(
  'schedule_assignments',
  {
    id: uuid('id').primaryKey(),
    scheduleId: uuid('schedule_id').references(() => scheduleSchema.id),
    employeeId: uuid('employee_id').references(() => employeeSchema.id),
    assignmentType: text('assignment_type').$type<'primary' | 'assistant'>().default('primary'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Analytics table
export const analyticsSchema = pgTable(
  'analytics',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    clientId: uuid('client_id').references(() => clientSchema.id),
    employeeId: uuid('employee_id').references(() => employeeSchema.id),
    metricName: text('metric_name').notNull(),
    metricValue: bigint('metric_value', { mode: 'number' }),
    metricDate: timestamp('metric_date', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Constraint Definitions table
export const constraintDefinitionSchema = pgTable(
  'constraint_definitions',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    name: text('name').notNull(),
    type: text('type').$type<'HARD' | 'MEDIUM' | 'SOFT'>().notNull(),
    priority: text('priority').notNull(),
    weight: integer('weight').notNull(),
    category: text('category').$type<'SKILL' | 'PREFERENCE' | 'RESOURCE' | 'TIME' | 'LOCATION'>().notNull(),
    isSystem: boolean('is_system').default(false),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Constraint Values table
export const constraintValueSchema = pgTable(
  'constraint_values',
  {
    id: uuid('id').primaryKey(),
    constraintDefinitionId: uuid('constraint_definition_id').references(() => constraintDefinitionSchema.id),
    entityType: text('entity_type').$type<'ORGANIZATION' | 'EMPLOYEE' | 'CLIENT'>().notNull(),
    entityId: uuid('entity_id').notNull(),
    value: json('value').notNull(),
    overrideWeight: integer('override_weight'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Vehicles table
export const vehicleSchema = pgTable(
  'vehicles',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    name: text('name').notNull(),
    type: text('type').notNull(),
    capacity: integer('capacity'),
    status: text('status').$type<'ACTIVE' | 'MAINTENANCE' | 'INACTIVE'>().default('ACTIVE'),
    location: point('location'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Shift Templates table
export const shiftTemplateSchema = pgTable(
  'shift_templates',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    name: text('name').notNull(),
    startTime: timestamp('start_time', { mode: 'date' }).notNull(),
    endTime: timestamp('end_time', { mode: 'date' }).notNull(),
    breakWindows: json('break_windows'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Employee Shifts table
export const employeeShiftSchema = pgTable(
  'employee_shifts',
  {
    id: uuid('id').primaryKey(),
    employeeId: uuid('employee_id').references(() => employeeSchema.id),
    shiftTemplateId: uuid('shift_template_id').references(() => shiftTemplateSchema.id),
    date: timestamp('date', { mode: 'date' }).notNull(),
    vehicleId: uuid('vehicle_id').references(() => vehicleSchema.id),
    actualStart: timestamp('actual_start', { mode: 'date' }),
    actualEnd: timestamp('actual_end', { mode: 'date' }),
    status: text('status').$type<'PLANNED' | 'ACTIVE' | 'COMPLETED'>().default('PLANNED'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Visit Requirements table
export const visitRequirementSchema = pgTable(
  'visit_requirements',
  {
    id: uuid('id').primaryKey(),
    clientId: uuid('client_id').references(() => clientSchema.id),
    serviceType: text('service_type').notNull(),
    duration: interval('duration').notNull(),
    frequency: json('frequency'),
    priority: integer('priority').default(1),
    timeWindows: json('time_windows'),
    eCareVisitType: text('ecare_visit_type'), // Original eCare visit type
    eCareRequirements: json('ecare_requirements'), // Additional eCare specific requirements
    requiredEmployeeCount: integer('required_employee_count').default(1), // For multi-employee visits
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Schedule Solutions table
export const scheduleSolutionSchema = pgTable(
  'schedule_solutions',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    runDate: timestamp('run_date', { mode: 'date' }).notNull(),
    inputData: json('input_data').notNull(),
    outputSolution: json('output_solution').notNull(),
    score: json('score').notNull(),
    status: text('status').$type<'RUNNING' | 'COMPLETED' | 'FAILED'>().default('RUNNING'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Schedule Metrics table
export const scheduleMetricSchema = pgTable(
  'schedule_metrics',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    scheduleDate: timestamp('schedule_date', { mode: 'date' }).notNull(),
    metricType: text('metric_type').notNull(),
    value: numeric('value', { precision: 10, scale: 2 }).notNull(),
    constraintImpacts: json('constraint_impacts'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// eCare Integration table
export const eCareIntegrationSchema = pgTable(
  'ecare_integration',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    importSource: text('import_source').$type<'JSON_UPLOAD' | 'DIRECT_API'>().notNull(),
    importedAt: timestamp('imported_at', { mode: 'date' }).defaultNow().notNull(),
    rawData: json('raw_data').notNull(),
    status: text('status').$type<'PENDING' | 'PROCESSED' | 'FAILED'>().default('PENDING'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

// Schedule Comparison table
export const scheduleComparisonSchema = pgTable(
  'schedule_comparisons',
  {
    id: uuid('id').primaryKey(),
    organizationId: uuid('organization_id').references(() => organizationSchema.id),
    manualScheduleId: uuid('manual_schedule_id').references(() => scheduleSchema.id),
    optimizedScheduleId: uuid('optimized_schedule_id').references(() => scheduleSchema.id),
    comparisonMetrics: json('comparison_metrics').notNull(),
    status: text('status').$type<'PENDING' | 'COMPLETED' | 'FAILED'>().default('PENDING'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);
