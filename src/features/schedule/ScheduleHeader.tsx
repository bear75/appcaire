'use client';

import { useState } from 'react';
import { Calendar, Users, Wand2 } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ConstraintManager from './ConstraintManager';

export default function ScheduleHeader() {
  const t = useTranslations('Schedule');
  const [showStaffDialog, setShowStaffDialog] = useState(false);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-purple-900">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowCalendarDialog(true)}
            className="bg-white hover:bg-purple-50 hover:text-purple-600 border-purple-100"
          >
            <Calendar className="size-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowStaffDialog(true)}
            className="bg-white hover:bg-purple-50 hover:text-purple-600 border-purple-100"
          >
            <Users className="size-4" />
          </Button>
          <ConstraintManager />
          <Button 
            variant="default" 
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2 min-w-[140px]"
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            <Wand2 className="size-4" />
            {isOptimizing ? 'Optimerar...' : t('optimize_schedule')}
          </Button>
        </div>
      </div>

      {/* Calendar View Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="bg-white sm:max-w-[425px] p-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Välj kalendervy
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Välj hur du vill visa schemat. För närvarande är endast dagsvy tillgänglig.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                <Calendar className="size-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-purple-900">Dagsvy</p>
                <p className="text-sm text-purple-600">Tillgänglig nu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <Calendar className="size-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-600">Veckovy</p>
                <p className="text-sm text-gray-500">Kommer snart</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <Calendar className="size-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-600">Månadsvy</p>
                <p className="text-sm text-gray-500">Kommer snart</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Staff Selection Dialog */}
      <Dialog open={showStaffDialog} onOpenChange={setShowStaffDialog}>
        <DialogContent className="bg-white sm:max-w-[425px] p-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Välj personal att visa
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Kommande funktioner för personalhantering i schemat.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <Users className="size-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-600">Filtrera personal</p>
                <p className="text-sm text-gray-500">Välj vilken personal som ska visas i schemat</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <Users className="size-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-600">Gruppera efter team</p>
                <p className="text-sm text-gray-500">Visa personal grupperad efter team</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 hover-card-effect">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI-Driven</p>
              <h3 className="text-2xl font-bold text-purple-600">92%</h3>
            </div>
            <div className="text-purple-600">
              <Wand2 className="size-8" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+5.2% optimization gain</p>
        </Card>
      </div>
    </div>
  );
}
