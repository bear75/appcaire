import { Calendar, Mail, MapPin, Phone, Star, User } from 'lucide-react';
import { useTranslations } from '@/utils/translations';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - replace with actual data from your backend
const mockEmployee = {
  id: 1,
  name: 'Anna Andersson',
  email: 'anna.andersson@example.com',
  phone: '+46 70 123 45 67',
  role: 'Nurse',
  status: 'Active',
  avatar: '/avatars/aa.png',
  address: 'Storgatan 1, 123 45 Stockholm',
  startDate: '2022-01-15',
  skills: [
    { name: 'Medicin', level: 95 },
    { name: 'Sårvård', level: 85 },
    { name: 'Demens', level: 90 },
  ],
  certifications: [
    { name: 'Sjuksköterskeexamen', date: '2020-05-15', expires: '2025-05-15' },
    { name: 'HLR-certifiering', date: '2023-01-10', expires: '2024-01-10' },
  ],
  performance: {
    taskCompletion: 98,
    clientSatisfaction: 4.8,
    punctuality: 95,
    continuityScore: 92,
  },
  availability: {
    preferredHours: '07:00-15:00',
    maxHoursPerWeek: 40,
    vacationDays: 25,
  },
};

export function EmployeeProfile() {
  const t = useTranslations('Employees');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-purple-500 to-purple-600">
          <div className="absolute -bottom-12 left-8">
            <Avatar className="size-24 border-4 border-white shadow-md">
              <img src={mockEmployee.avatar} alt={mockEmployee.name} />
            </Avatar>
          </div>
        </div>
        <div className="p-8 pt-16">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{mockEmployee.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="default" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {mockEmployee.role}
                </Badge>
                <Badge
                  variant={mockEmployee.status === 'Active' ? 'default' : 'secondary'}
                  className={
                    mockEmployee.status === 'Active'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }
                >
                  {mockEmployee.status}
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">
              {t('edit_profile')}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4" />
              <span>{mockEmployee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="size-4" />
              <span>{mockEmployee.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" />
              <span>{mockEmployee.address}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" />
              <span>{t('started')}: {mockEmployee.startDate}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-4 rounded-lg bg-background p-1">
          <TabsTrigger 
            value="overview"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('overview')}
          </TabsTrigger>
          <TabsTrigger 
            value="skills"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('skills')}
          </TabsTrigger>
          <TabsTrigger 
            value="schedule"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('schedule')}
          </TabsTrigger>
          <TabsTrigger 
            value="performance"
            className="rounded-md px-3 py-2 ring-offset-background transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
          >
            {t('performance')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Overview */}
            <Card>
              <div className="p-6">
                <h3 className="font-semibold">{t('performance_metrics')}</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t('task_completion')}
                      </span>
                      <span className="text-sm font-medium">
                        {mockEmployee.performance.taskCompletion}%
                      </span>
                    </div>
                    <Progress value={mockEmployee.performance.taskCompletion} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      {t('client_satisfaction')}: {mockEmployee.performance.clientSatisfaction}/5
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Availability */}
            <Card>
              <div className="p-6">
                <h3 className="font-semibold">{t('availability')}</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t('preferred_hours')}
                    </span>
                    <span>{mockEmployee.availability.preferredHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t('max_hours_week')}
                    </span>
                    <span>{mockEmployee.availability.maxHoursPerWeek}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t('vacation_days')}
                    </span>
                    <span>{mockEmployee.availability.vacationDays} {t('days')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold">{t('skills_certifications')}</h3>
              <div className="mt-6 space-y-6">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t('skills')}
                  </h4>
                  <div className="mt-4 space-y-4">
                    {mockEmployee.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t('certifications')}
                  </h4>
                  <div className="mt-4 space-y-4">
                    {mockEmployee.certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {t('issued')}: {cert.date}
                          </p>
                        </div>
                        <Badge
                          variant={
                            new Date(cert.expires) > new Date()
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {t('expires')}: {cert.expires}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold">{t('schedule')}</h3>
              {/* Schedule content will be implemented separately */}
              <p className="mt-4 text-muted-foreground">{t('schedule_coming_soon')}</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold">{t('detailed_performance')}</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t('key_metrics')}
                  </h4>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm">{t('task_completion')}</span>
                        <span className="font-medium">
                          {mockEmployee.performance.taskCompletion}%
                        </span>
                      </div>
                      <Progress value={mockEmployee.performance.taskCompletion} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm">{t('punctuality')}</span>
                        <span className="font-medium">
                          {mockEmployee.performance.punctuality}%
                        </span>
                      </div>
                      <Progress value={mockEmployee.performance.punctuality} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm">{t('continuity_score')}</span>
                        <span className="font-medium">
                          {mockEmployee.performance.continuityScore}%
                        </span>
                      </div>
                      <Progress value={mockEmployee.performance.continuityScore} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t('client_feedback')}
                  </h4>
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <Star className="size-5 text-yellow-400" />
                      <span className="text-2xl font-bold">
                        {mockEmployee.performance.clientSatisfaction}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /5 {t('average_rating')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 