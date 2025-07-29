import { apiClient } from './api';
import { Product, ProductFilters } from '../types';

export const fetchProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    let endpoint = 'products';
    
    if (filters?.categoryId) {
      endpoint = `products/${filters.categoryId}`;
    }

    const products = await apiClient.get<Product[]>(endpoint);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const product = await apiClient.get<Product>(`product/${id}`);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (productData: Omit<Product, 'idProduct' | 'createdAt'>): Promise<Product> => {
  try {
    const product = await apiClient.post<Product>('product', productData);
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
