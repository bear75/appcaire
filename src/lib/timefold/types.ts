// Core scheduling types
export type SchedulingProblem = {
  visits: Visit[];
  employees: Employee[];
  vehicles?: Vehicle[];
  constraints: Constraint[];
  timeWindow: TimeWindow;
};

export type TimeWindow = {
  start: string; // ISO date string
  end: string;   // ISO date string
};

export type Visit = {
  id: string;
  clientId: string;
  location: Location;
  duration: number; // in minutes
  requiredSkills: string[];
  timeWindows: TimeWindow[];
  priority: number;
};

export type Employee = {
  id: string;
  skills: string[];
  availability: TimeWindow[];
  location: Location;
  transportMode: 'DRIVING' | 'WALKING' | 'CYCLING';
  maxWorkingHours?: number;
  preferredClients?: string[];
};

export type Vehicle = {
  id: string;
  capacity: number;
  location: Location;
  availability: TimeWindow[];
};

export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};

// Constraint types
export type ConstraintType = 'HARD' | 'MEDIUM' | 'SOFT';

export type ConstraintCategory = 
  | 'SKILL'
  | 'PREFERENCE' 
  | 'RESOURCE'
  | 'TIME'
  | 'LOCATION';

export type Constraint = {
  id: string;
  type: ConstraintType;
  category: ConstraintCategory;
  weight: number;
  parameters?: Record<string, any>;
};

// Solution types
export type SchedulingSolution = {
  score: Score;
  assignments: Assignment[];
  metrics: SolutionMetrics;
};

export type Score = {
  hard: number;
  medium: number;
  soft: number;
};

export type Assignment = {
  visitId: string;
  employeeId: string;
  vehicleId?: string;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  travelTime: number; // in minutes
};

export type SolutionMetrics = {
  totalTravelTime: number;
  totalWorkingTime: number;
  averageUtilization: number;
  constraintSatisfaction: Record<string, number>;
};
