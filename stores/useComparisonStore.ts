import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Car } from '@/types/car';

interface ComparisonState {
  comparisonCars: Car[];

  // Actions
  addToComparison: (car: Car) => boolean;
  removeFromComparison: (carId: string) => void;
  clearComparison: () => void;
  isInComparison: (carId: string) => boolean;

  // Selectors (derived state)
  comparisonCount: number;
}

export const useComparisonStore = create<ComparisonState>()(
  devtools(
    persist(
      (set, get) => ({
        comparisonCars: [],

        addToComparison: (car: Car) => {
          const { comparisonCars } = get();

          if (comparisonCars.some((c) => c.id === car.id)) {
            return false;
          }

          if (comparisonCars.length >= 4) {
            alert('You can compare up to 4 cars only');
            return false;
          }

          set((state) => ({
            comparisonCars: [...state.comparisonCars, car],
            comparisonCount: state.comparisonCars.length + 1,
          }));
          return true;
        },

        removeFromComparison: (carId: string) => {
          set((state) => ({
            comparisonCars: state.comparisonCars.filter((car) => car.id !== carId),
            comparisonCount: state.comparisonCars.length - 1,
          }));
        },

        clearComparison: () => {
          set({ comparisonCars: [], comparisonCount: 0 });
        },

        isInComparison: (carId: string) => {
          return get().comparisonCars.some((car) => car.id === carId);
        },

        // Derived state
        comparisonCount: 0,
      }),
      {
        name: 'car-comparison-storage', // localStorage key
        partialize: (state) => ({ comparisonCars: state.comparisonCars }),
      }
    )
  )
);
