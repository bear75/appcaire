import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
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
                <CardDescription className="text-xs">
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
