import { supabase } from '@/lib/supabase';
import { ServiceError } from '@/lib/utils/service-error';
import type { TaskStatus } from '@/types';

export class TaskService {
  async getTask(id: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new ServiceError(error.message, 'TASK_ERROR');
      }
      return data;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError('Failed to fetch task', 'TASK_ERROR');
    }
  }

  async updateStatus(id: string, status: TaskStatus) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', id)
        .single();

      if (error) {
        throw new ServiceError(error.message, 'TASK_ERROR');
      }
      return data;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError('Failed to update task', 'TASK_ERROR');
    }
  }
}
