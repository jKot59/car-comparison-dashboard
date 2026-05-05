'use client';

import { ComparisonTable } from '@/components/ComparisonTable/ComparisonTable';
import { useComparisonStore } from '@/stores/useComparisonStore';
import styles from './page.module.scss';

export default function ComparePage() {
  const comparisonCars = useComparisonStore((state) => state.comparisonCars);
  const removeFromComparison = useComparisonStore((state) => state.removeFromComparison);
  const clearComparison = useComparisonStore((state) => state.clearComparison);

  return (
    <div className={`container ${styles.container}`}>
      <ComparisonTable cars={comparisonCars} onRemove={removeFromComparison} onClear={clearComparison} />
    </div>
  );
}
