import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { MOCK_USER } from '@/mocks/user';

interface UserState {
  user: User | null;
  isOnboarded: boolean;
  selectedEventIds: string[];
  setUser: (user: User) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  addSelectedEvent: (eventId: string) => void;
  removeSelectedEvent: (eventId: string) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: MOCK_USER, // For demo purposes, we start with a mock user
      isOnboarded: true, // For demo purposes, we start as onboarded
      selectedEventIds: [],
      
      setUser: (user) => set({ user }),
      
      updateUserPreferences: (preferences) => 
        set((state) => ({
          user: state.user 
            ? { 
                ...state.user, 
                preferences: { 
                  ...state.user.preferences, 
                  ...preferences 
                } 
              } 
            : null
        })),
      
      addSelectedEvent: (eventId) => 
        set((state) => ({
          selectedEventIds: [...state.selectedEventIds, eventId],
          user: state.user 
            ? { 
                ...state.user, 
                upcomingEvents: [...state.user.upcomingEvents, eventId] 
              } 
            : null
        })),
      
      removeSelectedEvent: (eventId) => 
        set((state) => ({
          selectedEventIds: state.selectedEventIds.filter(id => id !== eventId),
          user: state.user 
            ? { 
                ...state.user, 
                upcomingEvents: state.user.upcomingEvents.filter(id => id !== eventId) 
              } 
            : null
        })),
      
      completeOnboarding: () => set({ isOnboarded: true }),
    }),
    {
      name: 'cuculi-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);