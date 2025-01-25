'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "@/lib/utils/i18n/translations";
import { Upload } from "lucide-react";
import { useState } from "react";

interface ImportWizardProps {
  onImportComplete: () => void;
}

function ImportWizard({ onImportComplete }: ImportWizardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jsonContent, setJsonContent] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [importMethod, setImportMethod] = useState<'json' | 'csv'>('json');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      // If JSON file, read its content
      if (importMethod === 'json' && e.target.files[0].type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setJsonContent(event.target?.result as string);
        };
        reader.readAsText(e.target.files[0]);
      }
    }
  };

  const handleImport = async () => {
    if (!file && !jsonContent) return;
    
    setIsUploading(true);
    try {
      // TODO: Implement actual file upload and processing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload
      onImportComplete();
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Importera schema</h2>
          <p className="text-slate-600">
            Importera ditt nuvarande schema för att jämföra med AI-optimerat schema
          </p>
        </div>

        <Tabs defaultValue="json" onValueChange={(v) => setImportMethod(v as 'json' | 'csv')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json">JSON från eCare</TabsTrigger>
            <TabsTrigger value="csv">CSV-fil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="json">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                <Label htmlFor="json-file" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="size-8 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Klicka för att välja JSON-fil från eCare eller dra och släpp
                    </span>
                    <Input
                      id="json-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </Label>
              </div>

              {jsonContent && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-40">
                    {jsonContent}
                  </pre>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="csv">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                <Label htmlFor="csv-file" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="size-8 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Klicka för att välja CSV-fil eller dra och släpp
                    </span>
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {file && (
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
            <span className="text-sm truncate">{file.name}</span>
            <Button
              onClick={() => {
                setFile(null);
                setJsonContent('');
              }}
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
            >
              Ta bort
            </Button>
          </div>
        )}

        <Button
          onClick={handleImport}
          disabled={!file || isUploading}
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          {isUploading ? "Importerar..." : "Importera schema"}
        </Button>
      </div>
    </Card>
  );
}

export default ImportWizard; 