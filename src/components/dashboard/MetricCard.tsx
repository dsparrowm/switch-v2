import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  color?: string;
}

export function MetricCard({ title, value, description, icon: Icon, change, color = 'text-primary' }: MetricCardProps) {
  const changeIcon = change?.type === 'increase' ? '↗' : '↘';
  const changeColor = change?.type === 'increase' ? 'text-success' : 'text-destructive';

  return (
    <Card className="card-gradient hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {change && (
          <p className={`text-xs mt-1 ${changeColor}`}>
            {changeIcon} {Math.abs(change.value)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}