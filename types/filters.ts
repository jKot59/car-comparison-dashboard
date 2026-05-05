import { SortOption } from '@/types/car';

export interface FiltersProps {
  priceRange: [number, number];
  maxPrice: number;
  minPrice: number;
  selectedBrands: string[];
  selectedTypes: string[];
  sortBy: SortOption;
  availableBrands: string[];
  availableTypes: string[];
  onPriceChange: (value: [number, number]) => void;
  onBrandToggle: (brand: string) => void;
  onTypeToggle: (type: string) => void;
  onSortChange: (value: SortOption) => void;
  onReset: () => void;
}
