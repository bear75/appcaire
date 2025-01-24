import type { Schedule } from './types';
import { ImportSource, ScheduleStatus, ScheduleType } from './types';

export const demoSchedule: Schedule = {
  id: 'demo-1',
  organization_id: 'demo-org',
  type: ScheduleType.OPTIMIZED,
  status: ScheduleStatus.PUBLISHED,
  start_date: '2024-01-22',
  end_date: '2024-01-28',
  metadata: {
    source: ImportSource.DEMO,
    importMethod: 'DIRECT_API',
    importedAt: new Date().toISOString(),
    optimizationScore: {
      travelTime: 92.5,
      staffUtilization: 87.5,
      constraintSatisfaction: 98.2,
    },
  },
  data: {
    entries: [
      {
        employeeId: 'emp-1',
        clientId: 'client-1',
        startDateTime: '2024-01-22T08:00:00',
        endDateTime: '2024-01-22T09:30:00',
        category: 'PERSONAL_CARE',
      },
      {
        employeeId: 'emp-1',
        clientId: 'client-2',
        startDateTime: '2024-01-22T10:00:00',
        endDateTime: '2024-01-22T11:00:00',
        category: 'MEDICATION',
      },
      {
        employeeId: 'emp-2',
        clientId: 'client-3',
        startDateTime: '2024-01-22T09:00:00',
        endDateTime: '2024-01-22T10:30:00',
        category: 'HOUSEKEEPING',
      },
    ],
  },
  created_at: '2024-01-21T12:00:00',
  updated_at: '2024-01-21T12:00:00',
};
