import type { Schedule } from '@/features/schedule/types';
import { ImportSource, ScheduleStatus, ScheduleType } from '@/features/schedule/types';

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
        id: 'visit-1',
        employeeId: 'emp-1',
        employeeName: 'Anna Andersson',
        employeeAvatar: '/images/default-avatar.png',
        clientId: 'client-1',
        clientName: 'Erik Svensson',
        startDateTime: '2024-01-22T08:00:00',
        endDateTime: '2024-01-22T09:30:00',
        type: 'PERSONAL_CARE',
        location: 'Storgatan 1, Stockholm',
      },
      {
        id: 'visit-2',
        employeeId: 'emp-1',
        employeeName: 'Anna Andersson',
        employeeAvatar: '/images/default-avatar.png',
        clientId: 'client-2',
        clientName: 'Maria Larsson',
        startDateTime: '2024-01-22T10:00:00',
        endDateTime: '2024-01-22T11:00:00',
        type: 'MEDICATION',
        location: 'Kungsgatan 5, Stockholm',
      },
      {
        id: 'visit-3',
        employeeId: 'emp-2',
        employeeName: 'Johan Nilsson',
        employeeAvatar: '/images/default-avatar.png',
        clientId: 'client-3',
        clientName: 'Karl Johansson',
        startDateTime: '2024-01-22T09:00:00',
        endDateTime: '2024-01-22T10:30:00',
        type: 'CLEANING',
        location: 'Drottninggatan 10, Stockholm',
      },
    ],
  },
  created_at: '2024-01-21T12:00:00',
  updated_at: '2024-01-21T12:00:00',
};
