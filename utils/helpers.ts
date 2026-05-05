import { Car, FilterState, SortOption } from '@/types/car';

export const filterCars = (cars: Car[], filters: FilterState): Car[] => {
  let filtered = [...cars];

  // Price filter
  filtered = filtered.filter((car) => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]);

  // Brand filter
  if (filters.brands.length > 0) {
    filtered = filtered.filter((car) => filters.brands.includes(car.brand));
  }

  // Type filter
  if (filters.types.length > 0) {
    filtered = filtered.filter((car) => filters.types.includes(car.type));
  }

  return filtered;
};

export const sortCars = (cars: Car[], sortBy: SortOption): Car[] => {
  const sorted = [...cars];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'weight-asc':
      return sorted.sort((a, b) => a.weight - b.weight);
    default:
      return sorted;
  }
};

export const getAllBrands = (cars: Car[]): string[] => {
  return [...new Set(cars.map((car) => car.brand))].sort();
};

export const getAllTypes = (cars: Car[]): string[] => {
  return [...new Set(cars.map((car) => car.type))].sort();
};

export const getPriceRange = (cars: Car[]): [number, number] => {
  const prices = cars.map((car) => car.price);
  return [Math.min(...prices), Math.max(...prices)];
};
