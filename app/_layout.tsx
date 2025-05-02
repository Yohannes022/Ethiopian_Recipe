/**
 * Root layout component
 * Sets up the app's navigation structure, global providers, and error boundaries
 * Configures React Query, tRPC, and other global app settings
 */

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "./error-boundary";
import colors from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider } from "@/lib/trpc";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

// Create a client for React Query
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <TRPCProvider>
        <StatusBar style="dark" />
        <RootLayoutNav />
      </TRPCProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerBackTitle: "Back",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="recipe/[id]" 
        options={{ 
          title: "",
          headerTransparent: true,
        }} 
      />
      <Stack.Screen 
        name="create-recipe" 
        options={{ 
          title: "Create Recipe",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="edit-recipe/[id]" 
        options={{ 
          title: "Edit Recipe",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          title: "Edit Profile",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="restaurant/[id]" 
        options={{ 
          title: "",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="restaurant/[id]/manage" 
        options={{ 
          title: "Manage Restaurant",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="restaurant/[id]/add-menu-item" 
        options={{ 
          title: "Add Menu Item",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="restaurant/[id]/edit-menu-item" 
        options={{ 
          title: "Edit Menu Item",
          presentation: "modal",
        }} 
      />
    </Stack>
  );
}