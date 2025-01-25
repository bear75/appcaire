import type { ConstraintType } from '../types';

// Default weights for different constraint types
export const CONSTRAINT_WEIGHTS: Record<ConstraintType, number> = {
  HARD: 1000,
  MEDIUM: 100,
  SOFT: 1,
};

// Default solver configuration
export const SOLVER_CONFIG = {
  termination: {
    bestScoreFeasible: true,
    millisecondsSpentLimit: 30000, // 30 seconds
  },
  entityTabuSize: 7,
  acceptedCountLimit: 1000,
  entityTabuRatio: 0.2,
  valueTabuRatio: 0.2,
  fadeOutTabuSize: 5,
};

// Default scheduling parameters
export const SCHEDULING_PARAMS = {
  minVisitDuration: 15, // minutes
  maxVisitDuration: 240, // 4 hours
  defaultVisitDuration: 45,
  maxTravelTime: 60, // minutes
  defaultPriority: 1,
  maxPriority: 5,
  defaultWorkingHours: 8,
  maxWorkingHours: 12,
  minBreakDuration: 30,
  maxConsecutiveVisits: 5,
};

// Default constraints
export const DEFAULT_CONSTRAINTS = [
  {
    id: 'required-skills',
    type: 'HARD' as ConstraintType,
    category: 'SKILL',
    weight: CONSTRAINT_WEIGHTS.HARD,
    parameters: {},
  },
  {
    id: 'employee-availability',
    type: 'HARD' as ConstraintType,
    category: 'TIME',
    weight: CONSTRAINT_WEIGHTS.HARD,
    parameters: {},
  },
  {
    id: 'visit-time-window',
    type: 'HARD' as ConstraintType,
    category: 'TIME',
    weight: CONSTRAINT_WEIGHTS.HARD,
    parameters: {},
  },
  {
    id: 'max-working-hours',
    type: 'MEDIUM' as ConstraintType,
    category: 'RESOURCE',
    weight: CONSTRAINT_WEIGHTS.MEDIUM,
    parameters: {
      maxHours: SCHEDULING_PARAMS.maxWorkingHours,
    },
  },
  {
    id: 'preferred-clients',
    type: 'SOFT' as ConstraintType,
    category: 'PREFERENCE',
    weight: CONSTRAINT_WEIGHTS.SOFT,
    parameters: {},
  },
  {
    id: 'minimize-travel-time',
    type: 'SOFT' as ConstraintType,
    category: 'LOCATION',
    weight: CONSTRAINT_WEIGHTS.SOFT,
    parameters: {
      maxTravelTime: SCHEDULING_PARAMS.maxTravelTime,
    },
  },
];

export * from './solver';
export * from './scheduling'; 