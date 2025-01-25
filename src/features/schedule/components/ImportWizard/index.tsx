import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import type { ImportMethod } from '../../types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/lib/hooks';
import { CARD_STYLES } from '@/lib/styles';
import { useTranslations } from '@/lib/utils/i18n/translations';

import { useScheduleImport } from '../../hooks/useScheduleImport';
import { JsonImportForm } from './JsonImportForm';

type ImportWizardProps = {
  onImportComplete: (scheduleId: string) => void;
  onClose: () => void;
};

export function ImportWizard({ onImportComplete, onClose }: ImportWizardProps) {
  const { t } = useTranslation('schedule');
  const [_importMethod, setImportMethod] = useState<ImportMethod>('manual');
  const { isImporting } = useScheduleImport();
  const { toast } = useToast();

  const handleImportComplete = (scheduleId: string) => {
    toast({
      title: t('trial.import.success.title'),
      description: t('trial.import.success.description'),
    });
    onImportComplete(scheduleId);
  };

  return (
    <div className="space-y-6">
      <Card className={CARD_STYLES.base}>
        <CardHeader>
          <CardTitle>{t('trial.import.title')}</CardTitle>
          <CardDescription>
            {t('trial.import.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="JSON_UPLOAD" onValueChange={v => setImportMethod(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="JSON_UPLOAD">{t('trial.import.json_upload')}</TabsTrigger>
              <TabsTrigger value="DIRECT_API" disabled>
                {t('trial.import.direct_api')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="JSON_UPLOAD">
              <JsonImportForm
                onImportComplete={handleImportComplete}
                isImporting={isImporting}
              />
            </TabsContent>

            <TabsContent value="DIRECT_API">
              <div className="p-4 text-center text-slate-600">
                {t('trial.import.direct_api')}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className={CARD_STYLES.base}>
        <CardHeader>
          <CardTitle>{t('trial.import.how_to.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-4">
            {(() => {
              const steps = t('trial.import.how_to.steps');
              return Array.isArray(steps)
                ? steps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))
                : (steps as string).split(',').map((step: string, index: number) => (
                    <li key={index}>{step.trim()}</li>
                  ));
            })()}
          </ol>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          {t('trial.import.cancel')}
        </Button>
      </div>
    </div>
  );
}
