export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  profileImage?: string;
  role: UserRole;
  createdAt: string;
  favorites: string[];
  restaurantId?: string; // Only for restaurant owners
  avatarUrl?: string;
}

export type UserRole = "customer" | "restaurant_owner" | "admin";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl: string;
  category: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  restaurantId?: string; // If the recipe is from a restaurant
  authorAvatar: string;
  prepTime: number; // Added prepTime property
  cookTime: number;
  isLiked: boolean;
  isSaved: boolean;
  region?: string;
  tags?: string[];
  steps: Step[];
  likes: number;
}

export interface Review {
  id: string;
  recipeId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export type Step = {
  id: string;
  description: string;
  imageUrl?: string;
};

export type Ingredient = {
  id: string;
  name: string;
  amount: string;
  unit: string;
};

// Removed duplicate local Step type declaration
