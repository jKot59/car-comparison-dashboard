'use client';

import { useCars } from '@/hooks/useCars';
import { Filters } from '@/components/Filters/Filters';
import { CarGrid } from '@/components/CarGrid/CarGrid';
import { ComparisonBar } from '@/components/ComparisonBar/ComparisonBar';
import styles from './page.module.scss';

export default function HomePage() {
  const {
    filteredCars,
    loading,
    filters,
    updatePriceRange,
    toggleBrand,
    toggleType,
    setSortBy,
    resetFilters,
    availableBrands,
    availableTypes,
    cars,
  } = useCars();

  const minPrice = cars.length > 0 ? Math.min(...cars.map((c) => c.price)) : 0;
  const maxPrice = cars.length > 0 ? Math.max(...cars.map((c) => c.price)) : 100000;

  return (
    <div className={`container ${styles.container}`}>
      <Filters
        priceRange={filters.priceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        selectedBrands={filters.brands}
        selectedTypes={filters.types}
        sortBy={filters.sortBy}
        availableBrands={availableBrands}
        availableTypes={availableTypes}
        onPriceChange={updatePriceRange}
        onBrandToggle={toggleBrand}
        onTypeToggle={toggleType}
        onSortChange={setSortBy}
        onReset={resetFilters}
      />
      <CarGrid cars={filteredCars} loading={loading} />
      <ComparisonBar />
    </div>
  );
}
