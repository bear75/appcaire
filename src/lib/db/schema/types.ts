import type { InferModel } from 'drizzle-orm';
import {
  analyticsSchema,
  clientSchema,
  constraintDefinitionSchema,
  constraintValueSchema,
  eCareIntegrationSchema,
  employeeSchema,
  employeeShiftSchema,
  organizationSchema,
  scheduleAssignmentSchema,
  scheduleComparisonSchema,
  scheduleMetricSchema,
  scheduleSchema,
  scheduleSolutionSchema,
  shiftTemplateSchema,
  userSchema,
  vehicleSchema,
  visitRequirementSchema,
} from './tables';

// Define types for each table
export type Organization = InferModel<typeof organizationSchema>;
export type User = InferModel<typeof userSchema>;
export type Employee = InferModel<typeof employeeSchema>;
export type Client = InferModel<typeof clientSchema>;
export type Schedule = InferModel<typeof scheduleSchema>;
export type ScheduleAssignment = InferModel<typeof scheduleAssignmentSchema>;
export type Analytics = InferModel<typeof analyticsSchema>;
export type ConstraintDefinition = InferModel<typeof constraintDefinitionSchema>;
export type ConstraintValue = InferModel<typeof constraintValueSchema>;
export type Vehicle = InferModel<typeof vehicleSchema>;
export type ShiftTemplate = InferModel<typeof shiftTemplateSchema>;
export type EmployeeShift = InferModel<typeof employeeShiftSchema>;
export type VisitRequirement = InferModel<typeof visitRequirementSchema>;
export type ScheduleSolution = InferModel<typeof scheduleSolutionSchema>;
export type ScheduleMetric = InferModel<typeof scheduleMetricSchema>;
export type ECareIntegration = InferModel<typeof eCareIntegrationSchema>;
export type ScheduleComparison = InferModel<typeof scheduleComparisonSchema>; 