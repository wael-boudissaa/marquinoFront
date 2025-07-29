import { useState, useCallback } from 'react';
import { fetchProductById } from '../../services/product';
import { Product } from '../../types';
import { ProductType } from '../types';

// Convert from new Product interface to legacy ProductType interface
const convertProductToLegacy = (product: Product): ProductType => ({
  id: product.idProduct,
  title: product.nameProduct,
  price: product.price,
  description: product.description,
  category: product.idCategorie,
  image: '/images/product1.png', // Default image for now
  rating: {
    rate: 4.5, // Default rating
    count: 10, // Default count
  },
});

export const useProductDetail = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductDetail = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const backendProduct = await fetchProductById(id);
      const convertedProduct = convertProductToLegacy(backendProduct);
      
      setProduct(convertedProduct);
    } catch (err: any) {
      console.error('Error fetching product detail:', err);
      setError(err.message || 'Failed to fetch product details');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    product,
    loading,
    error,
    getProductDetail,
  };
};