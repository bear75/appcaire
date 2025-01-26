'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTranslations } from '@/lib/utils/i18n/translations';

const data = [
  { month: 'Mar 2023', revenue: 32839.99, target: 30932.12 },
  { month: 'Jun 2023', revenue: 30500.0, target: 29500.0 },
  { month: 'Sep 2023', revenue: 28700.0, target: 28000.0 },
  { month: 'Dec 2023', revenue: 31200.0, target: 29800.0 },
  { month: 'Mar 2024', revenue: 33500.0, target: 31000.0 },
  { month: 'Jun 2024', revenue: 32000.0, target: 30500.0 },
  { month: 'Sep 2024', revenue: 12823.98, target: 10100.0 },
  { month: 'Dec 2024', revenue: 34500.0, target: 32000.0 },
];

export function Overview() {
  const t = useTranslations('Dashboard');

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `${value / 1000}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length >= 2) {
              const revenueValue = payload[0]?.value;
              const targetValue = payload[1]?.value;

              if (
                typeof revenueValue !== 'number'
                || typeof targetValue !== 'number'
              ) {
                return null;
              }

              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {t('overview.revenue')}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {new Intl.NumberFormat('sv-SE', {
                          style: 'currency',
                          currency: 'SEK',
                        }).format(revenueValue)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {t('overview.target')}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {new Intl.NumberFormat('sv-SE', {
                          style: 'currency',
                          currency: 'SEK',
                        }).format(targetValue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#94a3b8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
