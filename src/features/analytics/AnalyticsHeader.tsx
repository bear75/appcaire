import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/utils/translations';

export function AnalyticsHeader() {
  const t = useTranslations('Analytics');

  return (
    <Button variant="outline" className="gap-2">
      <Download className="size-4" />
      {t('export_report')}
    </Button>
  );
}
