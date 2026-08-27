import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { UpgradeCalculator } from '../components/tools/UpgradeCalculator';

export const CalculatorsPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators & Planning' }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <div className="space-y-8">
        <UpgradeCalculator />
      </div>
    </PageContainer>
  );
};
