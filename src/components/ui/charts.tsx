'use client';

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartProps = {
  data: any;
  height?: number;
};

export function BarChart({ data, height = 350 }: ChartProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data.data || data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
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
        />
        <Tooltip />
        {data.datasets?.map((dataset: any) => (
          <Bar
            key={`bar-${dataset.label || dataset.dataKey}`}
            dataKey={dataset.dataKey}
            fill={dataset.backgroundColor}
            name={dataset.label}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({ data, height = 350 }: ChartProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data.data || data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.datasets?.map((dataset: any) => (
          <Line
            key={`line-${dataset.label || dataset.dataKey}`}
            type="monotone"
            dataKey={dataset.dataKey}
            stroke={dataset.borderColor || dataset.backgroundColor}
            name={dataset.label}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function DoughnutChart({ data, height = 350 }: ChartProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data.data || data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label={({ name, value }) => `${name} : ${value}`}
        >
          {data.datasets?.[0].backgroundColor.map((color: string) => (
            <Cell key={`cell-${color.replace('#', '')}`} fill={color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, name]} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

// Alias for PieChart to maintain API consistency
export const PieChart = DoughnutChart;
