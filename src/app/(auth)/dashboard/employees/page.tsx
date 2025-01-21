import type { Metadata } from 'next';
import { getTranslations } from '@/utils/translations';

import { EmployeeHeader } from '@/features/employees/EmployeeHeader';
import { EmployeeList } from '@/features/employees/EmployeeList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Employees');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function EmployeesPage() {
  return (
    <main className="container mx-auto space-y-6 p-6">
      <EmployeeHeader />
      <EmployeeList />
    </main>
  );
}
