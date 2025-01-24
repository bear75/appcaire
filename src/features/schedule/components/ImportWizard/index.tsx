import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { JsonImportForm } from './JsonImportForm';
import { useScheduleImport } from '../../hooks/useScheduleImport';
import { CARD_STYLES } from '@/lib/styles';

interface ImportWizardProps {
  onImportComplete: (scheduleId: string) => void;
  onClose: () => void;
}

export function ImportWizard({ onImportComplete, onClose }: ImportWizardProps) {
  const [importMethod, setImportMethod] = useState<'JSON_UPLOAD' | 'DIRECT_API'>('JSON_UPLOAD');
  const { isImporting } = useScheduleImport();
  const { toast } = useToast();

  const handleImportComplete = (scheduleId: string) => {
    toast({
      title: 'Schedule Imported Successfully',
      description: 'Your schedule is ready for AI optimization',
    });
    onImportComplete(scheduleId);
  };

  return (
    <div className="space-y-6">
      <Card className={CARD_STYLES.base}>
        <CardHeader>
          <CardTitle>Import Schedule</CardTitle>
          <CardDescription>
            Import your existing schedule to compare with AI-optimized version
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="JSON_UPLOAD" onValueChange={(v) => setImportMethod(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="JSON_UPLOAD">JSON Upload</TabsTrigger>
              <TabsTrigger value="DIRECT_API" disabled>
                Direct API (Coming Soon)
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
                Direct API integration coming soon
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className={CARD_STYLES.base}>
        <CardHeader>
          <CardTitle>How to Export Your Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Export your schedule from eCare using the Business Intelligence API</li>
            <li>Use the GetScheduledMinutesExtended endpoint</li>
            <li>Save the response as JSON</li>
            <li>Paste the JSON content in the text area above</li>
          </ol>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
} 