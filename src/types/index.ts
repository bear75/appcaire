export enum SchedulingStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum TaskStatus {
  UNASSIGNED = 'UNASSIGNED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  scheduledStart?: Date;
  scheduledEnd?: Date;
  organizationId: string;
};

export type Schedule = {
  id: string;
  organization_id: string;
  type: 'MANUAL' | 'OPTIMIZED';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  start_date: Date;
  end_date: Date;
  metadata: {
    source: 'ECARE_JSON' | 'ECARE_API' | 'CAREFOX' | 'CSV' | 'DEMO';
    importMethod: 'JSON_UPLOAD' | 'DIRECT_API';
  };
  data: {
    entries: Array<{
      id: string;
      employeeId: string;
      clientId: string;
      startDateTime: Date;
      endDateTime: Date;
      category: string;
      location: {
        lat: number;
        lng: number;
        address: string;
      };
    }>;
  };
  created_at: Date;
  updated_at: Date;
};
