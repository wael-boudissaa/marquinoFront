// User and Authentication Types
export interface Profile {
  idProfile: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt: string;
  refreshToken?: string;
  type: 'customer' | 'admin';
  address: string;
  lastLogin: string;
}

export interface Customer {
  idCustomer: string;
  idProfile: string;
  profile?: Profile;
}

export interface Admin {
  idAdmin: string;
  idProfile: string;
  profile?: Profile;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  token: string;
  user: Profile;
}

// Product and Category Types
export interface Category {
  idCategorie: string;
  nameCategorie: string;
}

export interface Product {
  idProduct: string;
  nameProduct: string;
  idCategorie: string;
  price: number;
  description: string;
  boosted: boolean;
  stock: number;
  dateExpiration?: string;
  createdAt: string;
  category?: Category;
}

// Order Types
export interface Order {
  idCommande: string;
  idCustomer: string;
  status: 'pending' | 'delivered' | 'cancelled';
  price?: number;
  createdAt: string;
  customer?: Customer;
  products?: OrderProduct[];
}

export interface OrderProduct {
  idCommande: string;
  idProduct: string;
  quantity: number;
  product?: Product;
}

export interface CreateOrderRequest {
  products: {
    idProduct: string;
    quantity: number;
  }[];
}

// Rating and Feedback Types
export interface Rating {
  idRating: number;
  idCustomer: string;
  idProduct: string;
  rating: number;
  createdAt: string;
  customer?: Customer;
  product?: Product;
}

export interface Feedback {
  idFeedback: number;
  idCustomer: string;
  comment: string;
  createdAt: string;
  customer?: Customer;
}

export interface CreateFeedbackRequest {
  comment: string;
}

export interface CreateRatingRequest {
  idProduct: string;
  rating: number;
}

// Cart Types (Client-side only)
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

// UI State Types
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
}

// Search and Filter Types
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  boosted?: boolean;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
}