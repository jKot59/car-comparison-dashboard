export interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  weight: number;
  rating: number;
  type: string;
  image: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'weight-asc';

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  types: string[];
  sortBy: SortOption;
}
