import { useState } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';
import { validateECareSchedule, validateDateRange, validateScheduleConsistency } from '../utils/validation';
import type { ImportSource } from '../types';

interface ImportScheduleParams {
  source: ImportSource;
  data: any;
}

export function useScheduleImport() {
  const [isImporting, setIsImporting] = useState(false);
  const { organization } = useOrganization();
  const supabase = createClient();

  const importJsonSchedule = async (jsonContent: string): Promise<string> => {
    if (!organization) throw new Error('No organization found');
    
    setIsImporting(true);
    try {
      // Validate the JSON content
      const validationResult = validateECareSchedule(jsonContent);
      if (!validationResult.isValid) {
        throw new Error(validationResult.errors[0]?.message || 'Invalid schedule format');
      }

      // Additional validation for schedule consistency
      const consistencyErrors = validateScheduleConsistency(validationResult.data!.scheduleEntries);
      if (consistencyErrors.length > 0) {
        throw new Error(consistencyErrors[0].message);
      }

      // Get date range
      const { startDate, endDate } = validateDateRange(validationResult.data!.scheduleEntries);

      // Transform to our internal format
      const transformedData = {
        entries: validationResult.data!.scheduleEntries.map(entry => ({
          ...entry,
          startDateTime: `${entry.date}T${entry.startTime}:00`,
          endDateTime: `${entry.date}T${entry.endTime}:00`,
        }))
      };

      // Store in Supabase
      const { data: schedule, error } = await supabase
        .from('schedules')
        .insert({
          organization_id: organization.id,
          type: 'MANUAL',
          status: 'DRAFT',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          metadata: {
            source: 'ECARE_JSON' as ImportSource,
            importMethod: 'JSON_UPLOAD',
            importedAt: new Date().toISOString(),
          },
          data: transformedData
        })
        .select()
        .single();

      if (error) throw error;

      return schedule.id;
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importJsonSchedule,
    isImporting
  };
} 