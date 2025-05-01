/**
 * Registration screen with different options for customers and restaurant owners
 */

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { User, Store, ChevronRight } from "lucide-react-native";
import colors from "@/constants/Colors";
import typography from "@/constants/typography";
import Button from "@/components/Button";

export default function RegisterScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<
    "customer" | "restaurant_owner" | null
  >(null);

  const handleRoleSelect = (role: "customer" | "restaurant_owner") => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "customer") {
      router.push("/login");
    } else if (selectedRole === "restaurant_owner") {
      router.push("/restaurant-signup");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Join Ethiopian Recipe Share</Text>
          <Text style={styles.subtitle}>
            Select how you want to use the app
          </Text>
        </View>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "customer" && styles.selectedRoleCard,
            ]}
            onPress={() => handleRoleSelect("customer")}
          >
            <View style={styles.roleIconContainer}>
              <User size={32} color={colors.primary} />
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleName}>Customer</Text>
              <Text style={styles.roleDescription}>
                Order food from restaurants, discover recipes, and share your
                own creations
              </Text>
            </View>
            <ChevronRight
              size={24}
              color={
                selectedRole === "customer" ? colors.primary : colors.lightText
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "restaurant_owner" && styles.selectedRoleCard,
            ]}
            onPress={() => handleRoleSelect("restaurant_owner")}
          >
            <View style={styles.roleIconContainer}>
              <Store size={32} color={colors.primary} />
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleName}>Restaurant Owner</Text>
              <Text style={styles.roleDescription}>
                Showcase your restaurant, manage your menu, and receive orders
              </Text>
            </View>
            <ChevronRight
              size={24}
              color={
                selectedRole === "restaurant_owner"
                  ? colors.primary
                  : colors.lightText
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            disabled={!selectedRole}
            fullWidth
          />
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginLinkText}>
              Already have an account?{" "}
              <Text style={styles.loginLinkTextBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    ...typography.heading1,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.lightText,
    textAlign: "center",
  },
  roleContainer: {
    marginBottom: 32,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedRoleCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleName: {
    ...typography.heading3,
    marginBottom: 4,
  },
  roleDescription: {
    ...typography.bodySmall,
    color: colors.lightText,
  },
  footer: {
    marginTop: "auto",
  },
  loginLink: {
    marginTop: 16,
    alignItems: "center",
  },
  loginLinkText: {
    ...typography.body,
    color: colors.lightText,
  },
  loginLinkTextBold: {
    fontWeight: "600",
    color: colors.primary,
  },
});
