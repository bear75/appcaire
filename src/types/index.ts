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
  status: SchedulingStatus;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
};
