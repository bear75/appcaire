'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CARD_STYLES = {
  base: 'rounded-xl border border-slate-200/50 bg-white shadow-md transition-all duration-300 ease-out transform-gpu hover:shadow-xl hover:-translate-y-1 hover:border-slate-200',
  large: 'hover:scale-[1.01]',
};

type KPICardProps = {
  title: string;
  value: string | number;
  trend: string;
  description?: string;
  className?: string;
};

export const KPICard = ({
  title,
  value,
  trend,
  description,
  className,
}: KPICardProps) => {
  const isPositive = trend.startsWith('+');
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <Card
      className={cn(
        CARD_STYLES.base,
        CARD_STYLES.large,
        'bg-gradient-to-br from-purple-50 to-purple-100',
        className,
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-purple-900">{value}</p>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  isPositive
                    ? 'bg-green-50 text-green-700 ring-green-600/20'
                    : 'bg-red-50 text-red-700 ring-red-600/20'
                }`}
              >
                <TrendIcon className="mr-1 size-3" />
                {trend}
              </span>
              {description && (
                <CardDescription className="text-xs text-purple-600">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
