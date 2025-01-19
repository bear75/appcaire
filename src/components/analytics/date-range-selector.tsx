import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function DateRangeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mock date range for Phase 1
  const handleDateChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('startDate', '2024-01-01');
    newParams.set('endDate', '2024-12-31');
    router.push(`?${newParams.toString()}`);
  };

  return <Button onClick={handleDateChange}>Select Date Range</Button>;
}
