// user store
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { ObjectKeyDto, ResultUpdateProfileData, ResultLoginDto, ThemeDto } from '../types';

export type StoreType = {
  user: ResultLoginDto | ObjectKeyDto | null;
  loading: boolean;
  userConnected: boolean;
  theme: ThemeDto;
  setUser: (userData: ResultLoginDto | ObjectKeyDto | ResultUpdateProfileData | null) => void;
  setLoading: (newLoading: boolean) => void;
  setUserConnected: (connectedStatus: boolean) => void;
  setTheme: (userTheme: ThemeDto) => void;
}

const useUserStore = create<StoreType>()(persist((set, get) => ({
  user: get()?.user ?? null, // Initial state for user info
  loading: true, // Tracks if user data is loading
  userConnected: get()?.userConnected ?? false, // initial user auth status
  theme: get()?.theme ?? 'light', // initial theme
  setUser: (newUser: any) => set({ user: newUser }), // Action to update user info
  setLoading: (newLoading: any) => set({ loading: newLoading }), // Action to update loading state
  setUserConnected: (connectedStatus: boolean) => set({ userConnected: connectedStatus }), // Action to update the user auth status
  setTheme: (theme: ThemeDto) => set({ theme: theme }),
}), {
  name: 'userStore',
  storage: createJSONStorage(() => sessionStorage),
}));

export default useUserStore;
