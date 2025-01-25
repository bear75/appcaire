import { Metadata } from 'next';

import { PageContainer } from '@/components/shared';
import { EmployeeDirectory } from '@/features/employees/EmployeeDirectory';
import { EmployeeHeader } from '@/features/employees/EmployeeHeader';
import { getTranslations } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Employees');

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default function EmployeesPage() {
  return (
    <PageContainer>
      <EmployeeHeader />
      <EmployeeDirectory />
    </PageContainer>
  );
}
