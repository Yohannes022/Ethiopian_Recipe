import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Clock,
  Users,
  Heart,
  Bookmark,
  Share2,
  ChevronLeft,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import { useRecipeStore } from "@/store/recipeStore";
import { useAuthStore } from "@/store/authStore";
import CategoryPill from "@/components/CategoryPill";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { recipes, toggleLike, toggleSave, deleteRecipe } = useRecipeStore();
  const { user } = useAuthStore();
  const [showOptions, setShowOptions] = useState(false);

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.notFound}>
        <Text style={typography.heading2}>Recipe not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isOwner = user?.id === recipe.authorId;
  const totalTime = recipe.prepTime + recipe.cookTime;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing recipe for ${recipe.title} on Ethiopian Recipe Share!`,
        title: recipe.title,
      });
    } catch (error) {
      console.error("Error sharing recipe:", error);
    }
  };

  const handleEdit = () => {
    setShowOptions(false);
    router.push(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = () => {
    setShowOptions(false);
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteRecipe(recipe.id);
            router.back();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreIconButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <MoreVertical size={24} color={colors.white} />
          </TouchableOpacity>

          {showOptions && isOwner && (
            <View style={styles.optionsMenu}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleEdit}
              >
                <Edit size={20} color={colors.text} />
                <Text style={styles.optionText}>Edit Recipe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleDelete}
              >
                <Trash2 size={20} color={colors.error} />
                <Text style={[styles.optionText, { color: colors.error }]}>
                  Delete Recipe
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{recipe.title}</Text>
            <View style={styles.authorContainer}>
              <Image
                source={{ uri: recipe.authorAvatar }}
                style={styles.authorAvatar}
              />
              <Text style={styles.authorName}>{recipe.authorName}</Text>
            </View>
          </View>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={16} color={colors.lightText} />
              <Text style={styles.metaText}>{totalTime} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Users size={16} color={colors.lightText} />
              <Text style={styles.metaText}>{recipe.servings} servings</Text>
            </View>
            <View style={styles.metaDifficulty}>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleLike(recipe.id)}
            >
              <Heart
                size={20}
                color={recipe.isLiked ? colors.primary : colors.lightText}
                fill={recipe.isLiked ? colors.primary : "none"}
              />
              <Text
                style={[
                  styles.actionText,
                  recipe.isLiked && { color: colors.primary },
                ]}
              >
                {recipe.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleSave(recipe.id)}
            >
              <Bookmark
                size={20}
                color={recipe.isSaved ? colors.secondary : colors.lightText}
                fill={recipe.isSaved ? colors.secondary : "none"}
              />
              <Text
                style={[
                  styles.actionText,
                  recipe.isSaved && { color: colors.secondary },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color={colors.lightText} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>

          {recipe.region && (
            <View style={styles.regionContainer}>
              <Text style={styles.regionLabel}>Region:</Text>
              <Text style={styles.regionText}>{recipe.region}</Text>
            </View>
          )}

          <View style={styles.tagsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsScrollContent}
            >
              {recipe.tags.map((tag) => (
                <CategoryPill
                  key={tag}
                  title={tag}
                  onPress={() => {}}
                  selected={false}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>
                  {ingredient.amount} {ingredient.unit}{" "}
                  <Text style={{ fontWeight: "600" }}>{ingredient.name}</Text>
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.steps.map((step, index) => (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step.description}</Text>
                  {step.imageUrl && (
                    <Image
                      source={{ uri: step.imageUrl }}
                      style={styles.stepImage}
                      contentFit="cover"
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    height: 300,
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
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreIconButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsMenu: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 70,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  optionText: {
    ...typography.body,
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    ...typography.heading1,
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  authorName: {
    ...typography.body,
    fontWeight: "500",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.lightText,
    marginLeft: 6,
  },
  metaDifficulty: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor:
      colors.accent + "33", // Adding transparency
    borderRadius: 12,
  },
  difficultyText: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    ...typography.bodySmall,
    marginLeft: 8,
    color: colors.lightText,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.heading3,
    marginBottom: 16,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
  },
  regionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  regionLabel: {
    ...typography.body,
    fontWeight: "600",
    marginRight: 8,
  },
  regionText: {
    ...typography.body,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsScrollContent: {
    paddingBottom: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  ingredientText: {
    ...typography.body,
    flex: 1,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 4,
  },
  stepNumberText: {
    color: colors.white,
    fontWeight: "600",
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    ...typography.body,
    marginBottom: 12,
  },
  stepImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 8,
  },
});