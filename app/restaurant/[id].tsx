/**
 * Restaurant detail screen
 * Shows restaurant information, menu items, and reviews
 * Allows users to browse menu, place orders, and view restaurant details
 * Provides filtering by category and detailed restaurant information
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  Phone,
  Mail,
  Share2,
  Heart,
  Bookmark,
  Info,
} from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import Button from "@/components/Button";
import MenuItemCard from "@/components/restaurant/MenuItemCard";
import ReviewCard from "@/components/restaurant/ReviewCard";
import { useRestaurantStore } from "@/store/restaurantStore";
import { useOrderStore } from "@/store/orderStore";
import { useLocationStore } from "@/store/locationStore";
import { MenuItem } from "@/types/restaurant";

const { width } = Dimensions.get("window");

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { 
    getRestaurantById, 
    getMenuItemsByRestaurantId, 
    getReviewsByRestaurantId 
  } = useRestaurantStore();
  const { addToCart, getCartItemCount } = useOrderStore();
  const { userLocation, calculateDistance } = useLocationStore();
  
  // Get restaurant data
  const restaurant = getRestaurantById(id);
  const menuItems = getMenuItemsByRestaurantId(id);
  const reviews = getReviewsByRestaurantId(id);
  
  // UI state
  const [activeTab, setActiveTab] = useState<"menu" | "reviews" | "info">("menu");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const cartItemCount = getCartItemCount();
  
  // Calculate distance when user location is available
  useEffect(() => {
    if (userLocation && restaurant?.location) {
      const dist = calculateDistance(userLocation, restaurant.location);
      setDistance(dist);
    }
  }, [userLocation, restaurant]);
  
  // Handle restaurant not found
  if (!restaurant) {
    return (
      <View style={styles.notFound}>
        <Text style={typography.heading2}>Restaurant not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Get unique categories from menu items
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );
  
  // Filter menu items by category if selected
  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;
  
  /**
   * Format price range to display as $ symbols
   * @param range - Price range string (low, medium, high)
   */
  const getPriceRange = (range: string) => {
    switch (range) {
      case "low":
        return "$";
      case "medium":
        return "$$";
      case "high":
        return "$$$";
      default:
        return "$$";
    }
  };
  
  /**
   * Add a menu item to the cart
   * @param menuItem - Menu item to add
   */
  const handleAddToCart = (menuItem: MenuItem) => {
    addToCart(menuItem, 1);
    // Show confirmation or navigate to cart
  };
  
  /**
   * Handle menu item selection
   * @param menuItem - Selected menu item
   */
  const handleMenuItemPress = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    // In a real app, this would open a modal with item details
    // For now, just add to cart
    handleAddToCart(menuItem);
  };
  
  /**
   * Handle sharing restaurant information
   */
  const handleShare = () => {
    // Share restaurant info
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant cover image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: restaurant.coverImageUrl || restaurant.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={styles.gradient}
          />
        </View>

        <View style={styles.content}>
          {/* Restaurant header information */}
          <View style={styles.header}>
            <Text style={styles.title}>{restaurant.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.secondary} fill={colors.secondary} />
              <Text style={styles.rating}>{restaurant.rating}</Text>
              <Text style={styles.reviewCount}>({restaurant.reviewCount} reviews)</Text>
            </View>
            
            <View style={styles.cuisineContainer}>
              {restaurant.cuisineType.map((cuisine, index) => (
                <React.Fragment key={cuisine}>
                  <Text style={styles.cuisine}>{cuisine}</Text>
                  {index < restaurant.cuisineType.length - 1 && (
                    <Text style={styles.cuisineDot}>•</Text>
                  )}
                </React.Fragment>
              ))}
              <Text style={styles.priceRange}>{getPriceRange(restaurant.priceRange)}</Text>
            </View>
          </View>

          {/* Restaurant meta information */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={16} color={colors.lightText} />
              <Text style={styles.metaText}>
                {restaurant.openingHours.open} - {restaurant.openingHours.close}
              </Text>
            </View>
            
            {distance !== null && (
              <View style={styles.metaItem}>
                <MapPin size={16} color={colors.lightText} />
                <Text style={styles.metaText}>{distance.toFixed(1)} km</Text>
              </View>
            )}
            
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {restaurant.isOpen ? "Open Now" : "Closed"}
              </Text>
            </View>
          </View>

          {/* Quick action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color={colors.text} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={20} color={colors.text} />
              <Text style={styles.actionText}>Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color={colors.text} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={20} color={colors.text} />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Tab navigation */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "menu" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("menu")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "menu" && styles.activeTabText,
                ]}
              >
                Menu
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "reviews" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("reviews")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "reviews" && styles.activeTabText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "info" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("info")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "info" && styles.activeTabText,
                ]}
              >
                Info
              </Text>
            </TouchableOpacity>
          </View>

          {/* Menu tab content */}
          {activeTab === "menu" && (
            <View style={styles.menuContainer}>
              {/* Category filter */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === null && styles.selectedCategoryButton,
                  ]}
                  onPress={() => setSelectedCategory(null)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === null && styles.selectedCategoryText,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.selectedCategoryButton,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {/* Menu items grid */}
              <View style={styles.menuItemsContainer}>
                <FlatList
                  data={filteredMenuItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <MenuItemCard
                      menuItem={item}
                      onPress={() => handleMenuItemPress(item)}
                      variant="vertical"
                    />
                  )}
                  numColumns={2}
                  scrollEnabled={false}
                />
              </View>
            </View>
          )}

          {/* Reviews tab content */}
          {activeTab === "reviews" && (
            <View style={styles.reviewsContainer}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <View style={styles.emptyReviews}>
                  <Text style={styles.emptyReviewsTitle}>No Reviews Yet</Text>
                  <Text style={styles.emptyReviewsText}>
                    Be the first to review this restaurant
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Info tab content */}
          {activeTab === "info" && (
            <View style={styles.infoContainer}>
              {/* About section */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>About</Text>
                <Text style={styles.infoText}>{restaurant.description}</Text>
              </View>
              
              {/* Location section */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Location</Text>
                <View style={styles.infoRow}>
                  <MapPin size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>{restaurant.location.address}</Text>
                </View>
              </View>
              
              {/* Hours section */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Hours</Text>
                <View style={styles.infoRow}>
                  <Clock size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>
                    {restaurant.openingHours.open} - {restaurant.openingHours.close}
                  </Text>
                </View>
              </View>
              
              {/* Contact section */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Contact</Text>
                <View style={styles.infoRow}>
                  <Phone size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>{restaurant.contactPhone}</Text>
                </View>
                {restaurant.contactEmail && (
                  <View style={styles.infoRow}>
                    <Mail size={16} color={colors.lightText} />
                    <Text style={styles.infoText}>{restaurant.contactEmail}</Text>
                  </View>
                )}
              </View>
              
              {/* Delivery information section */}
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Delivery Information</Text>
                <View style={styles.infoRow}>
                  <Info size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>
                    Delivery Fee: {restaurant.deliveryFee} ETB
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Info size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>
                    Minimum Order: {restaurant.minOrderAmount} ETB
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock size={16} color={colors.lightText} />
                  <Text style={styles.infoText}>
                    Estimated Delivery Time: {restaurant.estimatedDeliveryTime} minutes
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* View cart button */}
      <View style={styles.footer}>
        <Button
          title={cartItemCount > 0 ? `View Cart (${cartItemCount})` : "View Cart"}
          onPress={() => router.push("/cart")}
          variant="primary"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    ...typography.heading1,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    ...typography.bodySmall,
    fontWeight: "600",
    marginLeft: 4,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.lightText,
    marginLeft: 2,
  },
  cuisineContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cuisine: {
    ...typography.bodySmall,
    color: colors.lightText,
  },
  cuisineDot: {
    ...typography.bodySmall,
    color: colors.lightText,
    marginHorizontal: 4,
  },
  priceRange: {
    ...typography.bodySmall,
    color: colors.lightText,
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    ...typography.caption,
    color: colors.lightText,
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.primary + "20",
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    ...typography.caption,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    color: colors.lightText,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  menuContainer: {
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: "600",
  },
  menuItemsContainer: {
    marginBottom: 16,
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  emptyReviews: {
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  emptyReviewsTitle: {
    ...typography.heading4,
    marginBottom: 8,
  },
  emptyReviewsText: {
    ...typography.body,
    color: colors.lightText,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    ...typography.heading4,
    marginBottom: 8,
  },
  infoText: {
    ...typography.body,
    color: colors.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});