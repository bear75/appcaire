import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caire - Dashboard',
  description: 'Hantera din hemtjänst effektivt med Caire.',
};

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 