// Legacy ProductType interface for backward compatibility with UI components
export interface ProductType {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// Legacy CartItem interface
export interface CartItemType {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}