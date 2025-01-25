import type { SchedulingProblem, SchedulingSolution } from '../types';
import { SCHEDULING_PARAMS } from '../config';

/**
 * Validate a scheduling problem
 */
export function validateProblem(problem: SchedulingProblem): string[] {
  const errors: string[] = [];

  // Validate visits
  problem.visits.forEach((visit, index) => {
    if (!visit.id) {
      errors.push(`Visit ${index} is missing an ID`);
    }
    if (!visit.clientId) {
      errors.push(`Visit ${index} is missing a client ID`);
    }
    if (visit.duration < SCHEDULING_PARAMS.minVisitDuration) {
      errors.push(`Visit ${visit.id} duration is too short`);
    }
    if (visit.duration > SCHEDULING_PARAMS.maxVisitDuration) {
      errors.push(`Visit ${visit.id} duration is too long`);
    }
  });

  // Validate employees
  problem.employees.forEach((employee, index) => {
    if (!employee.id) {
      errors.push(`Employee ${index} is missing an ID`);
    }
    if (!employee.skills || employee.skills.length === 0) {
      errors.push(`Employee ${employee.id} has no skills`);
    }
    if (!employee.availability || employee.availability.length === 0) {
      errors.push(`Employee ${employee.id} has no availability`);
    }
  });

  // Validate time window
  if (!problem.timeWindow.start || !problem.timeWindow.end) {
    errors.push('Planning window is missing start or end time');
  }
  if (new Date(problem.timeWindow.start) >= new Date(problem.timeWindow.end)) {
    errors.push('Planning window end time must be after start time');
  }

  return errors;
}

/**
 * Validate a scheduling solution
 */
export function validateSolution(solution: SchedulingSolution): string[] {
  const errors: string[] = [];

  // Validate assignments
  solution.assignments.forEach((assignment, index) => {
    if (!assignment.visitId) {
      errors.push(`Assignment ${index} is missing a visit ID`);
    }
    if (!assignment.employeeId) {
      errors.push(`Assignment ${index} is missing an employee ID`);
    }
    if (!assignment.startTime || !assignment.endTime) {
      errors.push(`Assignment ${index} is missing start or end time`);
    }
    if (new Date(assignment.startTime) >= new Date(assignment.endTime)) {
      errors.push(`Assignment ${index} end time must be after start time`);
    }
  });

  // Validate metrics
  if (solution.metrics.totalTravelTime < 0) {
    errors.push('Total travel time cannot be negative');
  }
  if (solution.metrics.totalWorkingTime < 0) {
    errors.push('Total working time cannot be negative');
  }
  if (solution.metrics.averageUtilization < 0 || solution.metrics.averageUtilization > 1) {
    errors.push('Average utilization must be between 0 and 1');
  }

  return errors;
} 