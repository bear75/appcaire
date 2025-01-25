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