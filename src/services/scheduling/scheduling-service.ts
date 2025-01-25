import { db } from '@/lib/db';
import { ServiceError } from '@/lib/utils/service-error';
import type { SchedulingStatus } from '@/types';

export class SchedulingService {
  async getSchedule(id: string) {
    try {
      const { data, error } = await db
        .from('schedules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new ServiceError(error.message, 'SCHEDULE_ERROR');
      }
      return data;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError('Failed to fetch schedule', 'SCHEDULE_ERROR');
    }
  }

  async updateStatus(id: string, status: SchedulingStatus) {
    try {
      const { data, error } = await db
        .from('schedules')
        .update({ status })
        .eq('id', id)
        .single();

      if (error) {
        throw new ServiceError(error.message, 'SCHEDULE_ERROR');
      }
      return data;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError('Failed to update schedule', 'SCHEDULE_ERROR');
    }
  }
}
