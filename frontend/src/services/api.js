import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API endpoints
export const productAPI = {
  // Get all products with optional filters
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return api.get(`/products?${queryParams.toString()}`);
  },

  // Get single product by ID
  getProductById: (id) => api.get(`/products/${id}`),

  // Get products by category
  getProductsByCategory: (category, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return api.get(`/products/category/${category}?${queryParams.toString()}`);
  },

  // Get featured products
  getFeaturedProducts: () => api.get('/products/featured'),

  // Get all categories
  getCategories: () => api.get('/products/categories')
};

// Cart API endpoints
export const cartAPI = {
  // Get cart by session ID
  getCart: (sessionId) => api.get(`/cart/${sessionId}`),

  // Add item to cart
  addToCart: (sessionId, productId, quantity = 1) => 
    api.post('/cart/add', { sessionId, productId, quantity }),

  // Update cart item quantity
  updateCartItem: (sessionId, productId, quantity) => 
    api.put('/cart/update', { sessionId, productId, quantity }),

  // Remove item from cart
  removeFromCart: (sessionId, productId) => 
    api.delete(`/cart/remove/${sessionId}/${productId}`),

  // Clear entire cart
  clearCart: (sessionId) => api.delete(`/cart/clear/${sessionId}`)
};

// Utility functions for API calls
export const apiUtils = {
  // Handle API errors consistently
  handleApiError: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // Network error
      return 'Network error. Please check your connection.';
    } else {
      // Other error
      return error.message || 'An unexpected error occurred';
    }
  },

  // Format price for display
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

export default api;