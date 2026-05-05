'use client';

import { useState } from 'react';
import { Car } from '@/types/car';

export const useComparison = () => {
  const [comparisonCars, setComparisonCars] = useState<Car[]>([]);

  const addToComparison = (car: Car) => {
    if (comparisonCars.some((c) => c.id === car.id)) {
      return false;
    }
    if (comparisonCars.length >= 4) {
      alert('You can compare up to 4 cars only');
      return false;
    }
    setComparisonCars((prev) => [...prev, car]);
    return true;
  };

  const removeFromComparison = (carId: string) => {
    setComparisonCars((prev) => prev.filter((car) => car.id !== carId));
  };

  const clearComparison = () => {
    setComparisonCars([]);
  };

  const isInComparison = (carId: string) => {
    return comparisonCars.some((car) => car.id === carId);
  };

  return {
    comparisonCars,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    comparisonCount: comparisonCars.length,
  };
};
