export enum ScheduleType {
  MANUAL = 'MANUAL',
  OPTIMIZED = 'OPTIMIZED'
}

export enum ScheduleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum ImportSource {
  ECARE_JSON = 'ECARE_JSON',
  ECARE_API = 'ECARE_API',
  CAREFOX = 'CAREFOX',
  CSV = 'CSV',
  DEMO = 'DEMO'
}

export interface ScheduleEntry {
  employeeId: string;
  clientId: string;
  startDateTime: string;
  endDateTime: string;
  category?: string;
  groupId?: string;
}

export interface ProcessedScheduleEntry {
  employeeId: string;
  clientId: string;
  startDateTime: Date;
  endDateTime: Date;
  category?: string;
  groupId?: string;
}

export interface Schedule {
  id: string;
  organization_id: string;
  type: ScheduleType;
  status: ScheduleStatus;
  start_date: string;
  end_date: string;
  metadata: {
    source: ImportSource;
    importMethod: 'JSON_UPLOAD' | 'DIRECT_API';
    importedAt: string;
    optimizationScore?: {
      travelTime: number;
      staffUtilization: number;
      constraintSatisfaction: number;
    };
  };
  data: {
    entries: ScheduleEntry[];
  };
  created_at: string;
  updated_at: string;
}

export interface ProcessedSchedule {
  id: string;
  organization_id: string;
  type: ScheduleType;
  status: ScheduleStatus;
  start_date: Date;
  end_date: Date;
  metadata: {
    source: ImportSource;
    importMethod: 'JSON_UPLOAD' | 'DIRECT_API';
    importedAt: string;
    optimizationScore?: {
      travelTime: number;
      staffUtilization: number;
      constraintSatisfaction: number;
    };
  };
  data: {
    entries: ProcessedScheduleEntry[];
  };
  created_at: Date;
  updated_at: Date;
}

export interface ScheduleComparison {
  id: string;
  organization_id: string;
  manual_schedule_id: string;
  optimized_schedule_id: string;
  metrics: {
    travelTimeReduction: number;
    staffUtilizationImprovement: number;
    constraintSatisfactionRate: number;
  };
  created_at: string;
  status: 'PENDING' | 'COMPLETED';
}

// eCare API Types
export interface ECareScheduleEntry {
  date: string;
  groupId: string;
  clientId: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  category?: string;
} 