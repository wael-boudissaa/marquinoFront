import { apiClient } from './api';
import { Order, CreateOrderRequest } from '../types';

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const orders = await apiClient.get<Order[]>('commande');
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (customerId: string, orderData: CreateOrderRequest): Promise<Order> => {
  try {
    const order = await apiClient.post<Order>(`commande/${customerId}`, orderData);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const order = await apiClient.get<Order>(`commande/${orderId}`);
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};