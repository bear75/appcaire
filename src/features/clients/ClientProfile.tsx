'use client';

import {
  Calendar,
  Clock,
  Heart,
  Info,
  MapPin,
  Phone,
  Shield,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/lib/utils/i18n/translations';

// Mock data - replace with actual data fetching
const mockClient = {
  id: 1,
  name: 'Anna Andersson',
  email: 'anna.andersson@example.com',
  phone: '070-123 45 67',
  status: 'active',
  visitType: 'medical',
  avatar: '/avatars/anna.jpg',
  address: 'Storgatan 1, 123 45 Stockholm',
  birthDate: '1945-03-15',
  nextVisit: '2024-03-15T10:00:00',
  careNeeds: ['Medicindelning', 'Sårvård', 'Stödstrumpor'],
  riskFactors: ['Fallrisk', 'Diabetes typ 2'],
  serviceRequirements: {
    timeWindows: {
      morning: '08:00-10:00',
      evening: '18:00-20:00',
    },
    preferences: [
      'Kvinnlig vårdgivare',
      'Svensktalande',
      'Erfarenhet av demensvård',
    ],
    visitDuration: 45,
  },
  constraints: {
    medical: ['Insulin vid specifika tider', 'Blodtrycksmätning dagligen'],
    personal: ['Vill inte ha besök under lunchtid', 'Föredrar fasta tider'],
  },
  visitHistory: [
    {
      date: '2024-03-14',
      type: 'medical',
      caregiver: 'Maria Svensson',
      duration: 45,
      notes: 'Medicindelning och sårvård utförd',
    },
    {
      date: '2024-03-13',
      type: 'hygiene',
      caregiver: 'Eva Nilsson',
      duration: 30,
      notes: 'Dusch och påklädning',
    },
  ],
};

export function ClientProfile() {
  const t = useTranslations('Clients');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="size-24 border">
              <AvatarImage src={mockClient.avatar} alt={mockClient.name} />
              <AvatarFallback>
                {mockClient.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold">{mockClient.name}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    variant={
                      mockClient.status === 'active' ? 'default' : 'secondary'
                    }
                  >
                    {t(mockClient.status)}
                  </Badge>
                  <Badge variant="outline">{t(mockClient.visitType)}</Badge>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>{mockClient.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  <span>{mockClient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>{mockClient.birthDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>
                    {t('next_visit')}
                    :
                    {mockClient.nextVisit}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="shrink-0">
              {t('edit_profile')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 gap-4 rounded-lg bg-background p-1">
          <TabsTrigger
            value="overview"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('overview')}
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('requirements')}
          </TabsTrigger>
          <TabsTrigger
            value="constraints"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('constraints')}
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('visit_history')}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="size-5 text-red-500" />
                  {t('care_needs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockClient.careNeeds.map(need => (
                    <Badge key={need} variant="secondary">
                      {need}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5 text-yellow-500" />
                  {t('risk_factors')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockClient.riskFactors.map(risk => (
                    <Badge
                      key={risk}
                      variant="destructive"
                      className="bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      {risk}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5 text-purple-500" />
                {t('time_windows')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="font-medium">{t('morning_window')}</div>
                  <div className="text-sm text-muted-foreground">
                    {mockClient.serviceRequirements.timeWindows.morning}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{t('evening_window')}</div>
                  <div className="text-sm text-muted-foreground">
                    {mockClient.serviceRequirements.timeWindows.evening}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 font-medium">{t('preferences')}</div>
                <div className="flex flex-wrap gap-2">
                  {mockClient.serviceRequirements.preferences.map(pref => (
                    <Badge key={pref} variant="outline">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Constraints Tab */}
        <TabsContent value="constraints" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('medical_constraints')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  {mockClient.constraints.medical.map(constraint => (
                    <li key={constraint} className="text-sm">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('personal_constraints')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  {mockClient.constraints.personal.map(constraint => (
                    <li key={constraint} className="text-sm">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visit History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="size-5 text-blue-500" />
                {t('visit_history')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClient.visitHistory.map(visit => (
                  <div
                    key={visit.date}
                    className="flex items-start justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{visit.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {visit.caregiver}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {t(visit.type)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {visit.duration}
                        {' '}
                        {t('minutes')}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {visit.notes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
