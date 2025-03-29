import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  // Kullanıcı durumunu kontrol et
  checkAuth: async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        set({ isAuthenticated: true, user: JSON.parse(userData) });
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  },

  // Çıkış yap
  signOut: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  // Giriş yap
  signIn: async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      set({ isAuthenticated: true, user: userData });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  },
}));

 