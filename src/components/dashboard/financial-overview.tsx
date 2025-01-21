'use client';

import { useTranslations } from '@/utils/translations';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FinancialData = {
  date: string;
  revenue: number;
  costs: number;
  billableHours: number;
  efficiency: number;
};

const data: FinancialData[] = [
  {
    date: '2024-01',
    revenue: 240000,
    costs: 180000,
    billableHours: 1200,
    efficiency: 75,
  },
  {
    date: '2024-02',
    revenue: 280000,
    costs: 195000,
    billableHours: 1350,
    efficiency: 78,
  },
  {
    date: '2024-03',
    revenue: 320000,
    costs: 210000,
    billableHours: 1450,
    efficiency: 82,
  },
  // Add more monthly data
];

export function FinancialOverview() {
  const t = useTranslations('Dashboard.financial_overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatHours = (value: number) => `${value}h`;
  const formatEfficiency = (value: number) => `${value}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">{t('metrics.revenue')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} name={t('metrics.revenue')} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Costs Chart */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">{t('metrics.costs')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="costs" stroke="#EF4444" strokeWidth={2} name={t('metrics.costs')} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Billable Hours Chart */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">{t('metrics.billable_hours')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatHours} />
                  <Tooltip formatter={(value: number) => formatHours(value)} />
                  <Line type="monotone" dataKey="billableHours" stroke="#3B82F6" strokeWidth={2} name={t('metrics.billable_hours')} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Efficiency Chart */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">{t('metrics.efficiency')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatEfficiency} />
                  <Tooltip formatter={(value: number) => formatEfficiency(value)} />
                  <Line type="monotone" dataKey="efficiency" stroke="#22C55E" strokeWidth={2} name={t('metrics.efficiency')} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
