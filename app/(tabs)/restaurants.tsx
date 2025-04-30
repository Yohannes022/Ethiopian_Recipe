/**
 * Restaurants screen
 * Shows a list of restaurants with filtering and search options
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Filter, MapPin } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import CategoryPill from "@/components/CategoryPill";
import { useRestaurantStore } from "@/store/restaurantStore";
import { useLocationStore } from "@/store/locationStore";

export default function RestaurantsScreen() {
  const router = useRouter();
  const {
    restaurants,
    filteredRestaurants,
    searchQuery,
    selectedCuisineType,
    selectedPriceRange,
    setSearchQuery,
    setSelectedCuisineType,
    setSelectedPriceRange,
    filterRestaurants,
  } = useRestaurantStore();
  
  const {
    userLocation,
    getCurrentLocation,
    isLoadingLocation,
    locationError,
    getNearbyRestaurants,
  } = useLocationStore();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique cuisine types from all restaurants
  const cuisineTypes = Array.from(
    new Set(restaurants.flatMap((restaurant) => restaurant.cuisineType))
  );
  
  // Price range options
  const priceRanges = [
    { id: "low", label: "$" },
    { id: "medium", label: "$$" },
    { id: "high", label: "$$$" },
  ];
  
  // Get nearby restaurants
  const nearbyRestaurants = userLocation
    ? getNearbyRestaurants(filteredRestaurants)
    : filteredRestaurants;
  
  // Request location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getCurrentLocation();
    filterRestaurants();
    setIsRefreshing(false);
  };
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleCuisineSelect = (cuisine: string) => {
    if (selectedCuisineType === cuisine) {
      setSelectedCuisineType(null);
    } else {
      setSelectedCuisineType(cuisine);
    }
  };
  
  const handlePriceRangeSelect = (priceRange: string) => {
    if (selectedPriceRange === priceRange) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(priceRange);
    }
  };
  
  const clearFilters = () => {
    setSelectedCuisineType(null);
    setSelectedPriceRange(null);
  };
  
  const renderRestaurantItem = ({ item }: { item: any }) => (
    <RestaurantCard restaurant={item} variant="vertical" />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {userLocation?.address || "Getting your location..."}
          </Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search restaurants, cuisines..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilters && styles.activeFilterButton,
          ]}
          onPress={toggleFilters}
        >
          <Filter
            size={20}
            color={showFilters ? colors.white : colors.text}
          />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Cuisine</Text>
              {selectedCuisineType && (
                <TouchableOpacity onPress={clearFilters}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cuisineContainer}
            >
              {cuisineTypes.map((cuisine) => (
                <CategoryPill
                  key={cuisine}
                  title={cuisine}
                  isSelected={selectedCuisineType === cuisine}
                  onPress={() => handleCuisineSelect(cuisine)}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.priceRangeButton,
                    selectedPriceRange === range.id && styles.selectedPriceRange,
                  ]}
                  onPress={() => handlePriceRangeSelect(range.id)}
                >
                  <Text
                    style={[
                      styles.priceRangeText,
                      selectedPriceRange === range.id && styles.selectedPriceRangeText,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
      
      <FlatList
        data={nearbyRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>
              {userLocation ? "Nearby Restaurants" : "All Restaurants"}
            </Text>
            {locationError && (
              <Text style={styles.errorText}>
                {locationError}. Showing all restaurants.
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Restaurants Found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters or search query
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    ...typography.heading1,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    ...typography.bodySmall,
    color: colors.lightText,
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filtersContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  filterTitle: {
    ...typography.heading4,
  },
  clearText: {
    ...typography.bodySmall,
    color: colors.primary,
  },
  cuisineContainer: {
    paddingBottom: 8,
  },
  priceRangeContainer: {
    flexDirection: "row",
  },
  priceRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    marginRight: 12,
  },
  selectedPriceRange: {
    backgroundColor: colors.primary,
  },
  priceRangeText: {
    ...typography.bodySmall,
    fontWeight: "600",
  },
  selectedPriceRangeText: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listHeader: {
    marginVertical: 16,
  },
  sectionTitle: {
    ...typography.heading3,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    ...typography.heading3,
    marginBottom: 8,
  },
  emptyText: {
    ...typography.body,
    color: colors.lightText,
    textAlign: "center",
  },
});