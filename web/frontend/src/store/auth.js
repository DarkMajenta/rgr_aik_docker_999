import { create } from 'zustand';
import axios from 'axios';

export const useAuth = create((set) => ({
  user: null,
  login: async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data });
      localStorage.setItem('token', token);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: response.data });
      } catch (err) {
        set({ user: null });
        localStorage.removeItem('token');
      }
    }
  },
}));