import { useState, useCallback } from 'react';
import { fetchProducts } from '../../services/product';
import { Product } from '../../types';
import { ProductType } from '../types';

// Convert from new Product interface to legacy ProductType interface
const convertProductToLegacy = (product: Product): ProductType => ({
  id: product.idProduct,
  title: product.nameProduct,
  price: product.price,
  description: product.description,
  category: product.idCategorie, // This might need to be mapped to category name
  image: '/images/product1.png', // Default image for now
  rating: {
    rate: 4.5, // Default rating - could be enhanced with real ratings
    count: 10, // Default count
  },
});

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async (limit?: number, search?: string, category?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build filters based on parameters
      const filters: any = {};
      if (category && category !== 'all') {
        filters.categoryId = category;
      }
      if (search) {
        filters.search = search;
      }

      const backendProducts = await fetchProducts(filters);
      
      // Convert to legacy format and apply limit if specified
      let convertedProducts = backendProducts.map(convertProductToLegacy);
      
      if (limit && limit > 0) {
        convertedProducts = convertedProducts.slice(0, limit);
      }
      
      setProducts(convertedProducts);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    getProducts,
  };
};