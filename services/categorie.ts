import { apiClient } from './api';
import { Category } from '../types';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categories = await apiClient.get<Category[]>('categories');
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Keep the old function name for backwards compatibility
export const fetchCategorie = fetchCategories;
