import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://aerohit-backend-skycomposer.amvera.io',
  withCredentials: true,
});

export const getProducts = () => api.get('/api/products');
export const getProduct = (id) => api.get(`/api/products/${id}`);
export const getCart = () => api.get('/api/cart');
export const addToCart = (productId, quantity) => api.post('/api/cart', { productId, quantity });
export const removeFromCart = (itemId) => api.delete(`/api/cart/${itemId}`);
export const clearCart = () => api.delete('/api/cart');
export const createOrder = (data) => api.post('/api/orders', data);