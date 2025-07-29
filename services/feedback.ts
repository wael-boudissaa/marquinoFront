import { apiClient } from './api';
import { Feedback, CreateFeedbackRequest, Rating, CreateRatingRequest } from '../types';

export const fetchFeedback = async (): Promise<Feedback[]> => {
  try {
    const feedback = await apiClient.get<Feedback[]>('feedback');
    return feedback;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};

export const createFeedback = async (feedbackData: CreateFeedbackRequest): Promise<Feedback> => {
  try {
    const feedback = await apiClient.post<Feedback>('feedback', feedbackData);
    return feedback;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw error;
  }
};

export const createRating = async (ratingData: CreateRatingRequest): Promise<Rating> => {
  try {
    const rating = await apiClient.post<Rating>('rating', ratingData);
    return rating;
  } catch (error) {
    console.error("Error creating rating:", error);
    throw error;
  }
};

export const fetchProductRatings = async (productId: string): Promise<Rating[]> => {
  try {
    const ratings = await apiClient.get<Rating[]>(`ratings/product/${productId}`);
    return ratings;
  } catch (error) {
    console.error("Error fetching product ratings:", error);
    throw error;
  }
};