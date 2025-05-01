/**
 * Store for restaurant, menu, and delivery features
 * Manages restaurant listings, menu items, and related data
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restaurant, MenuItem, Review } from "@/types/restaurant";
import { restaurants as mockRestaurants, menuItems as mockMenuItems, reviews as mockReviews } from "@/mocks/restaurants";

interface RestaurantState {
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  reviews: Review[];
  selectedRestaurantId: string | null;
  filteredRestaurants: Restaurant[];
  searchQuery: string;
  selectedCuisineType: string | null;
  selectedPriceRange: string | null;
  
  // Actions
  setRestaurants: (restaurants: Restaurant[]) => void;
  setMenuItems: (menuItems: MenuItem[]) => void;
  setReviews: (reviews: Review[]) => void;
  setSelectedRestaurantId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCuisineType: (cuisineType: string | null) => void;
  setSelectedPriceRange: (priceRange: string | null) => void;
  filterRestaurants: () => void;
  getRestaurantById: (id: string) => Restaurant | undefined;
  getMenuItemsByRestaurantId: (restaurantId: string) => MenuItem[];
  getReviewsByRestaurantId: (restaurantId: string) => Review[];
  addReview: (review: Omit<Review, "id" | "createdAt" | "likes">) => void;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      restaurants: mockRestaurants,
      menuItems: mockMenuItems,
      reviews: mockReviews,
      selectedRestaurantId: null,
      filteredRestaurants: mockRestaurants,
      searchQuery: "",
      selectedCuisineType: null,
      selectedPriceRange: null,
      
      setRestaurants: (restaurants) => {
        set({ restaurants });
        get().filterRestaurants();
      },
      
      setMenuItems: (menuItems) => {
        set({ menuItems });
      },
      
      setReviews: (reviews) => {
        set({ reviews });
      },
      
      setSelectedRestaurantId: (id) => {
        set({ selectedRestaurantId: id });
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterRestaurants();
      },
      
      setSelectedCuisineType: (cuisineType) => {
        set({ selectedCuisineType: cuisineType });
        get().filterRestaurants();
      },
      
      setSelectedPriceRange: (priceRange) => {
        set({ selectedPriceRange: priceRange });
        get().filterRestaurants();
      },
      
      filterRestaurants: () => {
        const { restaurants, searchQuery, selectedCuisineType, selectedPriceRange } = get();
        
        let filtered = [...restaurants];
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (restaurant) =>
              restaurant.name.toLowerCase().includes(query) ||
              restaurant.description.toLowerCase().includes(query) ||
              restaurant.cuisineType.some((cuisine) => cuisine.toLowerCase().includes(query))
          );
        }
        
        if (selectedCuisineType) {
          filtered = filtered.filter((restaurant) =>
            restaurant.cuisineType.includes(selectedCuisineType)
          );
        }
        
        if (selectedPriceRange) {
          filtered = filtered.filter(
            (restaurant) => restaurant.priceRange === selectedPriceRange
          );
        }
        
        set({ filteredRestaurants: filtered });
      },
      
      getRestaurantById: (id) => {
        return get().restaurants.find((restaurant) => restaurant.id === id);
      },
      
      getMenuItemsByRestaurantId: (restaurantId) => {
        return get().menuItems.filter((item) => item.restaurantId === restaurantId);
      },
      
      getReviewsByRestaurantId: (restaurantId) => {
        return get().reviews.filter((review) => review.restaurantId === restaurantId);
      },
      
      addReview: (reviewData) => {
        const newReview: Review = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          likes: 0,
          ...reviewData,
        };
        
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
        
        // Update restaurant rating
        set((state) => {
          const restaurant = state.restaurants.find(r => r.id === reviewData.restaurantId);
          if (restaurant) {
            const restaurantReviews = [
              ...state.reviews.filter(r => r.restaurantId === reviewData.restaurantId),
              newReview
            ];
            
            const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
            const newRating = totalRating / restaurantReviews.length;
            
            return {
              restaurants: state.restaurants.map(r => 
                r.id === reviewData.restaurantId 
                  ? { 
                      ...r, 
                      rating: parseFloat(newRating.toFixed(1)), 
                      reviewCount: r.reviewCount + 1 
                    } 
                  : r
              )
            };
          }
          return state;
        });
      },
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);