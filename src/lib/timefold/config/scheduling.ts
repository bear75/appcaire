import type { ConstraintType } from '../types';

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
    weight: 1000,
    parameters: {},
  },
  {
    id: 'employee-availability',
    type: 'HARD' as ConstraintType,
    category: 'TIME',
    weight: 1000,
    parameters: {},
  },
  {
    id: 'visit-time-window',
    type: 'HARD' as ConstraintType,
    category: 'TIME',
    weight: 1000,
    parameters: {},
  },
  {
    id: 'max-working-hours',
    type: 'MEDIUM' as ConstraintType,
    category: 'RESOURCE',
    weight: 100,
    parameters: {
      maxHours: 12,
    },
  },
  {
    id: 'preferred-clients',
    type: 'SOFT' as ConstraintType,
    category: 'PREFERENCE',
    weight: 1,
    parameters: {},
  },
  {
    id: 'minimize-travel-time',
    type: 'SOFT' as ConstraintType,
    category: 'LOCATION',
    weight: 1,
    parameters: {
      maxTravelTime: 60,
    },
  },
]; 