import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  USER: '/user',
  LOGOUT: '/logout',
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY: (id) => `/categories/${id}`,
  
  // Products
  POSTS: '/posts',
  POST: (id) => `/posts/${id}`,
  FEATURED_POSTS: '/posts/featured',
  LOW_STOCK_POSTS: '/posts/low-stock',
  POSTS_BY_CATEGORY: (categoryId) => `/posts/category/${categoryId}`,
  POSTS_BY_PRICE_RANGE: '/posts/price-range',
};

// API methods
export const apiService = {
  // Authentication
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.REGISTER, userData),
  getUser: () => api.get(API_ENDPOINTS.USER),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  
  // Categories
  getCategories: () => api.get(API_ENDPOINTS.CATEGORIES),
  getCategory: (id) => api.get(API_ENDPOINTS.CATEGORY(id)),
  createCategory: (data) => api.post(API_ENDPOINTS.CATEGORIES, data),
  updateCategory: (id, data) => api.put(API_ENDPOINTS.CATEGORY(id), data),
  deleteCategory: (id) => api.delete(API_ENDPOINTS.CATEGORY(id)),
  
  // Products
  getPosts: (params = {}) => api.get(API_ENDPOINTS.POSTS, { params }),
  getPost: (id) => api.get(API_ENDPOINTS.POST(id)),
  createPost: (data) => api.post(API_ENDPOINTS.POSTS, data),
  updatePost: (id, data) => api.put(API_ENDPOINTS.POST(id), data),
  deletePost: (id) => api.delete(API_ENDPOINTS.POST(id)),
  getFeaturedPosts: () => api.get(API_ENDPOINTS.FEATURED_POSTS),
  getLowStockPosts: () => api.get(API_ENDPOINTS.LOW_STOCK_POSTS),
  getPostsByCategory: (categoryId) => api.get(API_ENDPOINTS.POSTS_BY_CATEGORY(categoryId)),
  getPostsByPriceRange: (minPrice, maxPrice) => 
    api.get(API_ENDPOINTS.POSTS_BY_PRICE_RANGE, { 
      params: { min_price: minPrice, max_price: maxPrice } 
    }),
};

export default api;