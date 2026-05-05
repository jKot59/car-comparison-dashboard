import { describe, it, expect } from 'vitest';
import { filterCars, sortCars, getAllBrands, getPriceRange } from '@/utils/helpers';
import { Car } from '@/types/car';

const mockCars: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    price: 26400,
    weight: 1590,
    rating: 4.5,
    type: 'Sedan',
    fuelEfficiency: 32,
    horsepower: 203,
    image: '',
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Accord',
    price: 27500,
    weight: 1550,
    rating: 4.7,
    type: 'Sedan',
    fuelEfficiency: 30,
    horsepower: 192,
    image: '',
  },
  {
    id: '3',
    brand: 'Tesla',
    model: 'Model 3',
    price: 38990,
    weight: 1840,
    rating: 4.9,
    type: 'Electric',
    fuelEfficiency: 132,
    horsepower: 283,
    image: '',
  },
];

describe('helpers', () => {
  describe('filterCars', () => {
    it('filters by price range', () => {
      const result = filterCars(mockCars, {
        priceRange: [26000, 28000],
        brands: [],
        types: [],
        sortBy: 'rating-desc',
      });
      expect(result).toHaveLength(2);
      expect(result[0].model).toBe('Camry');
      expect(result[1].model).toBe('Accord');
    });

    it('filters by brand', () => {
      const result = filterCars(mockCars, {
        priceRange: [0, 100000],
        brands: ['Toyota'],
        types: [],
        sortBy: 'rating-desc',
      });
      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('Toyota');
    });
  });

  describe('sortCars', () => {
    it('sorts by price ascending', () => {
      const result = sortCars(mockCars, 'price-asc');
      expect(result[0].price).toBe(26400);
      expect(result[2].price).toBe(38990);
    });

    it('sorts by rating descending', () => {
      const result = sortCars(mockCars, 'rating-desc');
      expect(result[0].rating).toBe(4.9);
      expect(result[2].rating).toBe(4.5);
    });
  });

  describe('getAllBrands', () => {
    it('returns unique brands', () => {
      const brands = getAllBrands(mockCars);
      expect(brands).toEqual(['Honda', 'Tesla', 'Toyota']);
    });
  });

  describe('getPriceRange', () => {
    it('returns min and max price', () => {
      const [min, max] = getPriceRange(mockCars);
      expect(min).toBe(26400);
      expect(max).toBe(38990);
    });
  });
});
