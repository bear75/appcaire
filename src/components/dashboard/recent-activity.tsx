'use client';

import { Users } from 'lucide-react';
import { useQuery } from 'react-query';

import { Progress } from '@/components/ui/progress';

type RegionData = {
  name: string;
  value: number;
  total: number;
  change: number;
};

const regions: RegionData[] = [
  { name: 'Stockholm', value: 634, total: 800, change: 8.2 },
  { name: 'Göteborg', value: 589, total: 800, change: 7.2 },
  { name: 'Malmö', value: 562, total: 800, change: 6.2 },
  { name: 'Uppsala', value: 453, total: 800, change: 5.4 },
];

const mockActivities = [
  // Add your mock activities here
];

export function RecentActivity() {
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      return mockActivities;
    },
  });

  return (
    <div className="space-y-8">
      {regions.map(region => (
        <div key={region.name} className="flex items-center">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium leading-none">
                    {region.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {region.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-green-500">
                    +
                    {region.change}
                    %
                  </span>
                </div>
              </div>
            </div>
            <Progress
              value={(region.value / region.total) * 100}
              className="h-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
