import { PageContainer } from '@/components/shared';
import { VehicleProfile } from '@/features/vehicles';

export default function VehicleProfilePage() {
  return (
    <PageContainer>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <VehicleProfile />
      </div>
    </PageContainer>
  );
}
