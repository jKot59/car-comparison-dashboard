'use client';

import { useState, useEffect } from 'react';
import { Car, FilterState, SortOption } from '@/types/car';
import { filterCars, sortCars, getAllBrands, getAllTypes, getPriceRange } from '@/utils/helpers';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    brands: [],
    types: [],
    sortBy: 'rating-desc',
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/cars.json');
        const data = await response.json();
        setCars(data);
        const priceRange = getPriceRange(data);
        setFilters((prev) => ({ ...prev, priceRange }));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    if (cars.length === 0) return;
    let result = filterCars(cars, filters);
    result = sortCars(result, filters.sortBy);
    setFilteredCars(result);
  }, [cars, filters]);

  const updatePriceRange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
    }));
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type],
    }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    const priceRange = getPriceRange(cars);
    setFilters({
      priceRange,
      brands: [],
      types: [],
      sortBy: 'rating-desc',
    });
  };

  const availableBrands = getAllBrands(cars);
  const availableTypes = getAllTypes(cars);

  return {
    cars,
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
  };
};
