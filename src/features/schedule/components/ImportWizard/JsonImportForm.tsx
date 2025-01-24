import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useScheduleImport } from '../../hooks/useScheduleImport';
import { validateECareSchedule } from '../../utils/validation';

interface JsonImportFormProps {
  onImportComplete: (scheduleId: string) => void;
  isImporting: boolean;
}

export function JsonImportForm({ onImportComplete, isImporting }: JsonImportFormProps) {
  const [jsonContent, setJsonContent] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { importJsonSchedule } = useScheduleImport();

  const handleValidateAndImport = async () => {
    try {
      // First validate the JSON format and content
      const validationResult = validateECareSchedule(jsonContent);
      
      if (!validationResult.isValid) {
        setValidationError(validationResult.errors[0]?.message || 'Invalid schedule format');
        return;
      }

      // If valid, proceed with import
      const scheduleId = await importJsonSchedule(jsonContent);
      setValidationError(null);
      onImportComplete(scheduleId);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Failed to import schedule');
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        className="h-[300px] font-mono"
        placeholder={`{
  "scheduleEntries": [
    {
      "date": "2024-01-25",
      "groupId": "string",
      "clientId": "string",
      "employeeId": "string",
      "startTime": "08:00",
      "endTime": "09:00",
      "category": "string"
    }
  ]
}`}
        value={jsonContent}
        onChange={(e) => {
          setJsonContent(e.target.value);
          setValidationError(null);
        }}
      />

      {validationError && (
        <Alert variant="destructive">
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleValidateAndImport}
          disabled={!jsonContent.trim() || isImporting}
        >
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            'Import Schedule'
          )}
        </Button>
      </div>
    </div>
  );
} 