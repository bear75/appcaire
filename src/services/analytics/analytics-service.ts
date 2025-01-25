import { db } from '@/lib/db';
import { ServiceError } from '@/lib/utils/service-error';

export class AnalyticsService {
  async getOrganizationMetrics(
    organizationId: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const { data, error } = await db
        .from('analytics')
        .select('*')
        .eq('organization_id', organizationId)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .single();

      if (error) {
        throw new ServiceError(
          'Failed to fetch analytics',
          'ANALYTICS_FETCH_ERROR',
          500,
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw error;
      }
      throw new ServiceError(
        'Failed to fetch analytics',
        'ANALYTICS_FETCH_ERROR',
        500,
      );
    }
  }
}
