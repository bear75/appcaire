import { Metadata } from 'next';

import { EmployeeDirectory } from '@/features/employees/EmployeeDirectory';
import { EmployeeHeader } from '@/features/employees/EmployeeHeader';

export const metadata: Metadata = {
  title: 'Personal | Caire',
  description: 'Hantera personal och kompetenser',
};

export default function EmployeesPage() {
  return (
    <main className="flex min-h-screen flex-col gap-8 bg-slate-50 p-8">
      <EmployeeHeader />
      <EmployeeDirectory />
    </main>
  );
}
