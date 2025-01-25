import type { Meta, StoryObj } from '@storybook/react';

import { KPICard } from './KPICard';

const meta = {
  title: 'Components/Shared/KPICard',
  component: KPICard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PositiveTrend = {
  args: {
    title: 'Revenue',
    value: '123,456 kr',
    trend: '+12.3%',
    description: 'vs last month',
  },
} satisfies Story;

export const NegativeTrend = {
  args: {
    title: 'Costs',
    value: '98,765 kr',
    trend: '-5.4%',
    description: 'vs last month',
  },
} satisfies Story;

export const NoDescription = {
  args: {
    title: 'Active Users',
    value: '1,234',
    trend: '+15.7%',
  },
} satisfies Story;
