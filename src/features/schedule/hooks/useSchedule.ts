import { useState, useEffect } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';
import type { Schedule } from '../types';

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organization } = useOrganization();
  const supabase = createClient();

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