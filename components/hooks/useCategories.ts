import { useState, useCallback } from 'react';
import { fetchCategories } from '../../services/categorie';
import { Category } from '../../types';

// Simple category interface for legacy components
export interface CategoryType {
  id: string;
  name: string;
}

// Convert from new Category interface to legacy format
const convertCategoryToLegacy = (category: Category): CategoryType => ({
  id: category.idCategorie,
  name: category.nameCategorie,
});

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const backendCategories = await fetchCategories();
      const convertedCategories = backendCategories.map(convertCategoryToLegacy);
      
      // Convert to string array for legacy component compatibility
      const categoryNames = convertedCategories.map(cat => cat.name);
      
      // Add "all" category at the beginning for legacy component
      setCategories(['all', ...categoryNames]);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    getCategories,
  };
};