import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { UnitCompare } from '../components/tools/UnitCompare';
import { Scale } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ComparePage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Unit Comparison Tool' }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <div className="space-y-8">
        <UnitCompare />
      </div>
    </PageContainer>
  );
};
