import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    login: (userData, token) => {
        localStorage.setItem('token', token);
        set({ user: userData, token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
    setUser: (userData) => set({ user: userData })
}));

export default useAuthStore;
