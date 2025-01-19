import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServiceError } from '@/lib/utils/service-error';
import {
  createTestData,
  mockCache,
  mockLogger,
  mockMonitoring,
  mockSupabase,
} from '@/lib/utils/test-utils';

import { SchedulingService } from '../scheduling-service';

describe('SchedulingService', () => {
  let service: SchedulingService;
  let supabase: ReturnType<typeof mockSupabase>;
  let cache: ReturnType<typeof mockCache>;
  let logger: ReturnType<typeof mockLogger>;
  let monitoring: ReturnType<typeof mockMonitoring>;

  beforeEach(() => {
    supabase = mockSupabase();
    cache = mockCache();
    logger = mockLogger();
    monitoring = mockMonitoring();
    service = new SchedulingService(supabase, cache, logger, monitoring);
    vi.clearAllMocks();
  });

  describe('getSchedule', () => {
    const testSchedule = {
      id: '123',
      status: 'PENDING',
      organization_id: 'test-org',
    };

    it('should return cached schedule if available', async () => {
      cache.get.mockResolvedValue(testSchedule);

      const result = await service.getSchedule('123');

      expect(result).toEqual(testSchedule);
      expect(supabase.from).not.toHaveBeenCalled();
    });

    it('should fetch from database if not cached', async () => {
      cache.get.mockResolvedValue(null);
      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(createTestData.generic(testSchedule)),
      });

      const result = await service.getSchedule('123');

      expect(result).toEqual(testSchedule);
      expect(supabase.from).toHaveBeenCalledWith('schedules');
    });

    it('should handle database errors', async () => {
      cache.get.mockResolvedValue(null);
      const mockError = new Error('Database error');
      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockRejectedValue(mockError),
      });

      await expect(service.getSchedule('123')).rejects.toThrow(ServiceError);
      expect(monitoring.captureError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateStatus', () => {
    const testSchedule = {
      id: '123',
      status: 'COMPLETED',
      organization_id: 'test-org',
    };

    it('should update schedule status and invalidate cache', async () => {
      vi.spyOn(supabase, 'from').mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(createTestData.generic(testSchedule)),
      });

      const result = await service.updateStatus('123', 'COMPLETED');

      expect(result).toEqual(testSchedule);
      expect(cache.delete).toHaveBeenCalledWith('schedule:123');
    });

    it('should handle update errors', async () => {
      const mockError = new Error('Update error');
      vi.spyOn(supabase, 'from').mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockRejectedValue(mockError),
      });

      await expect(service.updateStatus('123', 'COMPLETED')).rejects.toThrow(
        ServiceError,
      );
      expect(monitoring.captureError).toHaveBeenCalledWith(mockError);
    });
  });
});
