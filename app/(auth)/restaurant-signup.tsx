/**
 * Restaurant owner signup screen
 * Collects restaurant information and creates a restaurant owner account
 * Multi-step form for comprehensive restaurant registration
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
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Camera, MapPin, Clock } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthStore } from "@/store/authStore";

export default function RestaurantSignupScreen() {
  const router = useRouter();
  const { registerRestaurantOwner, isLoading } = useAuthStore();
  
  // Form state
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openingTime, setOpeningTime] = useState("08:00");
  const [closingTime, setClosingTime] = useState("22:00");
  const [cuisineTypes, setCuisineTypes] = useState("");
  const [step, setStep] = useState(1);
  
  /**
   * Handle next step in registration process
   * Validates current step before proceeding
   */
  const handleNext = () => {
    if (step === 1) {
      if (!restaurantName || !description || !cuisineTypes) {
        Alert.alert("Missing Information", "Please fill in all required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!address || !phone) {
        Alert.alert("Missing Information", "Please fill in all required fields");
        return;
      }
      setStep(3);
    }
  };
  
  /**
   * Handle back navigation
   * Goes to previous step or back to previous screen
   */
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  
  /**
   * Handle form submission
   * Collects all data and submits registration
   */
  const handleSubmit = async () => {
    try {
      // In a real app, this would upload images and validate data
      const restaurantData = {
        name: restaurantName,
        description,
        cuisineType: cuisineTypes.split(",").map(cuisine => cuisine.trim()),
        address,
        phone,
        email,
        openingHours: {
          open: openingTime,
          close: closingTime
        }
      };
      
      await registerRestaurantOwner(restaurantData);
      Alert.alert(
        "Registration Submitted",
        "Your restaurant registration has been submitted for review. We'll notify you once it's approved.",
        [{ text: "OK", onPress: () => router.push("/login") }]
      );
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again later");
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Registration</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step indicators */}
        <View style={styles.stepsContainer}>
          {[1, 2, 3].map((stepNumber) => (
            <View key={stepNumber} style={styles.stepIndicatorContainer}>
              <View
                style={[
                  styles.stepIndicator,
                  step >= stepNumber && styles.activeStepIndicator,
                ]}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    step >= stepNumber && styles.activeStepNumber,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>
              {stepNumber < 3 && <View style={styles.stepConnector} />}
            </View>
          ))}
        </View>
        
        {/* Step title */}
        <Text style={styles.stepTitle}>
          {step === 1
            ? "Restaurant Information"
            : step === 2
            ? "Location & Contact"
            : "Hours & Verification"}
        </Text>
        
        {/* Step 1: Basic restaurant information */}
        {step === 1 && (
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.imageUploadContainer}>
              <Camera size={32} color={colors.primary} />
              <Text style={styles.imageUploadText}>Upload Restaurant Photo</Text>
            </TouchableOpacity>
            
            <Input
              label="Restaurant Name"
              value={restaurantName}
              onChangeText={setRestaurantName}
              placeholder="Enter your restaurant name"
              required
            />
            
            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Tell customers about your restaurant"
              multiline
              numberOfLines={4}
              required
            />
            
            <Input
              label="Cuisine Types"
              value={cuisineTypes}
              onChangeText={setCuisineTypes}
              placeholder="Ethiopian, Vegetarian, etc. (comma separated)"
              required
            />
          </View>
        )}
        
        {/* Step 2: Location and contact information */}
        {step === 2 && (
          <View style={styles.formContainer}>
            <Input
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Full restaurant address"
              icon={<MapPin size={20} color={colors.primary} />}
              required
            />
            
            <Input
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="+251 XX XXX XXXX"
              keyboardType="phone-pad"
              required
            />
            
            <Input
              label="Email (Optional)"
              value={email}
              onChangeText={setEmail}
              placeholder="restaurant@example.com"
              keyboardType="email-address"
            />
          </View>
        )}
        
        {/* Step 3: Hours and verification */}
        {step === 3 && (
          <View style={styles.formContainer}>
            <View style={styles.hoursContainer}>
              <Text style={styles.inputLabel}>Opening Hours</Text>
              <View style={styles.hoursRow}>
                <View style={styles.hourInputContainer}>
                  <Clock size={20} color={colors.primary} style={styles.hourIcon} />
                  <Input
                    value={openingTime}
                    onChangeText={setOpeningTime}
                    placeholder="08:00"
                    containerStyle={styles.hourInput}
                    label=""
                  />
                </View>
                <Text style={styles.hoursSeparator}>to</Text>
                <Input
                  value={closingTime}
                  onChangeText={setClosingTime}
                  placeholder="22:00"
                  containerStyle={styles.hourInput}
                  label=""
                />
              </View>
            </View>
            
            <View style={styles.verificationContainer}>
              <Text style={styles.verificationTitle}>Verification</Text>
              <Text style={styles.verificationText}>
                To complete your registration, we'll need to verify your restaurant.
                Please have the following ready:
              </Text>
              <View style={styles.verificationItem}>
                <View style={styles.verificationBullet} />
                <Text style={styles.verificationItemText}>Business license</Text>
              </View>
              <View style={styles.verificationItem}>
                <View style={styles.verificationBullet} />
                <Text style={styles.verificationItemText}>Owner ID</Text>
              </View>
              <View style={styles.verificationItem}>
                <View style={styles.verificationBullet} />
                <Text style={styles.verificationItemText}>Tax registration document</Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Footer with navigation buttons */}
        <View style={styles.footer}>
          {step < 3 ? (
            <Button
              title="Next"
              onPress={handleNext}
              variant="primary"
              fullWidth
            />
          ) : (
            <Button
              title="Submit Registration"
              onPress={handleSubmit}
              variant="primary"
              fullWidth
              loading={isLoading}
            />
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.heading4,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.divider,
  },
  activeStepIndicator: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepNumber: {
    ...typography.bodySmall,
    fontWeight: "600",
    color: colors.lightText,
  },
  activeStepNumber: {
    color: colors.white,
  },
  stepConnector: {
    width: 40,
    height: 2,
    backgroundColor: colors.divider,
    marginHorizontal: 8,
  },
  stepTitle: {
    ...typography.heading3,
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 24,
  },
  imageUploadContainer: {
    height: 160,
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.divider,
    borderStyle: "dashed",
  },
  imageUploadText: {
    ...typography.body,
    color: colors.primary,
    marginTop: 8,
  },
  hoursContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    ...typography.bodySmall,
    fontWeight: "600",
    marginBottom: 8,
  },
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hourInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hourIcon: {
    marginRight: 8,
  },
  hourInput: {
    flex: 1,
  },
  hoursSeparator: {
    ...typography.body,
    marginHorizontal: 16,
  },
  verificationContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  verificationTitle: {
    ...typography.heading4,
    marginBottom: 8,
  },
  verificationText: {
    ...typography.body,
    color: colors.lightText,
    marginBottom: 16,
  },
  verificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verificationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  verificationItemText: {
    ...typography.body,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 16,
  },
});