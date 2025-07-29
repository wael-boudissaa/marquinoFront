import { apiClient } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, Profile } from '../types';

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<any>('login', credentials);
    
    // DEBUG: Log the complete API response to understand structure
    console.log('=== API RESPONSE DEBUG ===');
    console.log('Complete response:', response);
    console.log('Response keys:', Object.keys(response));
    console.log('response.token:', response.token);
    console.log('response.user:', response.user);
    console.log('response.data:', response.data);
    console.log('response.profile:', response.profile);
    console.log('=========================');
    
    // Try to extract user data from different possible locations
    let userData = null;
    let token = null;
    
    // Check for token in different locations
    token = response.token || response.data?.token || response.accessToken;
    
    // Check for user data in different locations
    if (response.user) {
      userData = response.user;
      console.log('Auth Service: Found user data in response.user');
    } else if (response.data?.user) {
      userData = response.data.user;
      console.log('Auth Service: Found user data in response.data.user');
    } else if (response.data && typeof response.data === 'object' && response.data.idProfile) {
      userData = response.data;
      console.log('Auth Service: Found user data in response.data');
    } else if (response.profile) {
      userData = response.profile;
      console.log('Auth Service: Found user data in response.profile');
    } else {
      console.error('Auth Service: Could not find user data in response');
    }
    
    console.log('Extracted token:', !!token);
    console.log('Extracted userData:', userData);
    
    // Store data if both exist
    if (token && userData) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Auth Service: Login successful, data stored');
      
      // Return in expected format
      return {
        token: token,
        user: userData
      };
    } else {
      console.error('Auth Service: Missing required data - token:', !!token, 'user:', !!userData);
      throw new Error('Invalid login response: missing token or user data');
    }
    
  } catch (error) {
    console.error("Auth Service: Error during login:", error);
    throw error;
  }
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<any>('signup', userData);
    
    console.log('Auth Service: Register response:', response);
    
    // Extract token and user data (same logic as login)
    let userProfile = null;
    let token = null;
    
    token = response.token || response.data?.token || response.accessToken;
    
    if (response.user) {
      userProfile = response.user;
    } else if (response.data?.user) {
      userProfile = response.data.user;
    } else if (response.data && typeof response.data === 'object' && response.data.idProfile) {
      userProfile = response.data;
    } else if (response.profile) {
      userProfile = response.profile;
    }
    
    // Store token in localStorage
    if (token && userProfile) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userProfile));
      console.log('Auth Service: Registration successful, data stored');
      
      return {
        token: token,
        user: userProfile
      };
    } else {
      console.error('Auth Service: Invalid registration response');
      throw new Error('Invalid registration response: missing token or user data');
    }
  } catch (error) {
    console.error("Auth Service: Error during registration:", error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  console.log('Auth Service: Logout completed');
};

export const getCurrentUser = (): Profile | null => {
  if (typeof window !== 'undefined') {
    try {
      const userStr = localStorage.getItem('user');
      console.log('Auth Service: getCurrentUser - userStr from localStorage:', userStr);
      
      if (userStr && userStr !== 'undefined') {
        const user = JSON.parse(userStr);
        console.log('Auth Service: getCurrentUser - parsed user:', user);
        return user;
      }
      
      console.log('Auth Service: getCurrentUser - no valid user data found');
      return null;
    } catch (error) {
      console.error('Auth Service: Error parsing user from localStorage:', error);
      console.error('Auth Service: Corrupted userStr was:', localStorage.getItem('user'));
      // Clear corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    console.log('Auth Service: isAuthenticated check:');
    console.log('  - token exists:', !!token);
    console.log('  - user exists:', !!user);
    console.log('  - user value:', user);
    console.log('  - user is not undefined string:', user !== 'undefined');
    
    const isAuth = !!(token && user && user !== 'undefined');
    console.log('  - result:', isAuth);
    
    return isAuth;
  }
  return false;
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};