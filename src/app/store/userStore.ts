// user store
import {createStore, useStore} from 'zustand';

const useUserStore = createStore((set) => ({
  user: null, // Initial state for user info
  loading: false, // Tracks if user data is loading
  userConnected: false, // initial user auth status
  setUser: (newUser: any) => set({ user: newUser }), // Action to update user info
  setLoading: (newLoading: any) => set({ loading: newLoading }), // Action to update loading state
  setUserConnected: (connectedStatus: boolean) => set({userConnected: connectedStatus}), // Action to update the user auth status
}));

export default useUserStore;
