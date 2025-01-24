import { z } from 'zod';

// Define the eCare schedule schema using Zod
const eCareScheduleEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  groupId: z.string().optional(),
  clientId: z.string().min(1, 'Client ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid start time format. Use HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid end time format. Use HH:mm'),
  category: z.string().optional()
}).refine(data => {
  // Validate that startTime is before endTime
  const [startHour, startMinute] = data.startTime.split(':').map(Number);
  const [endHour, endMinute] = data.endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  return startMinutes < endMinutes;
}, {
  message: 'Start time must be before end time',
  path: ['startTime']
});

const eCareScheduleSchema = z.object({
  scheduleEntries: z.array(eCareScheduleEntrySchema).min(1, 'Schedule must contain at least one entry')
});

export interface ValidationError {
  path: string[];
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  data?: z.infer<typeof eCareScheduleSchema>;
}

export function validateECareSchedule(jsonContent: string): ValidationResult {
  try {
    // First try to parse the JSON
    const parsedJson = JSON.parse(jsonContent);
    
    // Then validate against our schema
    const result = eCareScheduleSchema.safeParse(parsedJson);
    
    if (result.success) {
      return {
        isValid: true,
        errors: [],
        data: result.data
      };
    }
    
    // Format Zod errors into our ValidationError format
    return {
      isValid: false,
      errors: result.error.errors.map(err => ({
        path: err.path,
        message: err.message
      }))
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [{
        path: [],
        message: 'Invalid JSON format'
      }]
    };
  }
}

// Additional validation helpers
export function validateDateRange(entries: z.infer<typeof eCareScheduleSchema>['scheduleEntries']) {
  const dates = entries.map(entry => new Date(entry.date));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  return {
    startDate: minDate,
    endDate: maxDate
  };
}

export function validateScheduleConsistency(entries: z.infer<typeof eCareScheduleSchema>['scheduleEntries']) {
  const errors: ValidationError[] = [];
  
  // Check for overlapping assignments for the same employee
  entries.forEach((entry1, i) => {
    entries.slice(i + 1).forEach(entry2 => {
      if (
        entry1.employeeId === entry2.employeeId &&
        entry1.date === entry2.date
      ) {
        const [start1Hour, start1Minute] = entry1.startTime.split(':').map(Number);
        const [end1Hour, end1Minute] = entry1.endTime.split(':').map(Number);
        const [start2Hour, start2Minute] = entry2.startTime.split(':').map(Number);
        const [end2Hour, end2Minute] = entry2.endTime.split(':').map(Number);
        
        const start1Minutes = start1Hour * 60 + start1Minute;
        const end1Minutes = end1Hour * 60 + end1Minute;
        const start2Minutes = start2Hour * 60 + start2Minute;
        const end2Minutes = end2Hour * 60 + end2Minute;
        
        if (
          (start1Minutes <= start2Minutes && end1Minutes > start2Minutes) ||
          (start2Minutes <= start1Minutes && end2Minutes > start1Minutes)
        ) {
          errors.push({
            path: ['scheduleEntries'],
            message: `Employee ${entry1.employeeId} has overlapping assignments on ${entry1.date}`
          });
        }
      }
    });
  });
  
  return errors;
}

export type { z }; 