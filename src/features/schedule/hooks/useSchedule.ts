import { useState, useEffect } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import type { Schedule } from '../types';

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organization } = useOrganization();

  const fetchSchedules = async () => {
    if (!organization) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSchedules(data as Schedule[]);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [organization?.id]);

  return {
    schedules,
    isLoading,
    refetchSchedules: fetchSchedules
  };
}

export function useScheduleById(scheduleId: string) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const { data, error } = await supabase
          .from('schedules')
          .select('*')
          .eq('id', scheduleId)
          .single();

        if (error) throw error;
        setSchedule(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [scheduleId]);

  return { schedule, loading, error };
} 