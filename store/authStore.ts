/**
 * Authentication store
 * Manages user authentication, registration, and profile data
 * Handles login, verification, and user role management
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole } from "@/types/recipe";
import { currentUser as mockUser } from "@/mocks/users";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  registerUser: (userData: Partial<User>, role: UserRole) => Promise<void>;
  registerRestaurantOwner: (restaurantData: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      /**
       * Initiate login process with phone number
       * In a real app, this would send an OTP to the user's phone
       * @param phone - User's phone number
       */
      login: async (phone) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // For demo purposes, we'll just check if the phone matches our mock user
          if (phone === mockUser.phone) {
            // Success - in a real app, this would trigger an OTP to be sent
            set({ isLoading: false });
          } else {
            // For demo, we'll allow any phone number to proceed
            set({ isLoading: false });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: "Failed to send verification code. Please try again.",
          });
        }
      },
      
      /**
       * Verify OTP and complete login
       * @param otp - One-time password entered by user
       */
      verifyOtp: async (otp) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // For demo purposes, any 6-digit OTP will work
          if (otp.length === 6) {
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              isLoading: false,
              error: "Invalid verification code. Please try again.",
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: "Failed to verify code. Please try again.",
          });
        }
      },
      
      /**
       * Log out the current user
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      /**
       * Update user profile information
       * @param userData - Partial user data to update
       */
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      /**
       * Register a new user
       * @param userData - User information
       * @param role - User role (customer, restaurant_owner, etc.)
       */
      registerUser: async (userData, role) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // Create a new user with the provided data and role
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: userData.name || "New User",
            phone: userData.phone || "",
            email: userData.email || "",
            profileImage: userData.profileImage || "",
            role: role,
            createdAt: new Date().toISOString(),
            favorites: [],
            ...userData
          };
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: "Registration failed. Please try again.",
          });
        }
      },
      
      /**
       * Register a restaurant owner
       * Creates both a user account and restaurant record
       * @param restaurantData - Restaurant information
       */
      registerRestaurantOwner: async (restaurantData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));
          
          // In a real app, this would create both a user account and a restaurant
          // For demo purposes, we'll just create a user with restaurant owner role
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: restaurantData.name || "Restaurant Owner",
            phone: restaurantData.phone || "",
            email: restaurantData.email || "",
            profileImage: "",
            role: "restaurant_owner",
            createdAt: new Date().toISOString(),
            favorites: [],
            restaurantId: `restaurant-${Date.now()}`, // In a real app, this would be the ID of the created restaurant
          };
          
          set({
            isLoading: false,
          });
          
          // Note: In a real app, we would set the user as authenticated here
          // For demo purposes, we'll require them to log in after registration
        } catch (error) {
          set({
            isLoading: false,
            error: "Restaurant registration failed. Please try again.",
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);