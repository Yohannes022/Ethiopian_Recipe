import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Bell,
  Moon,
  Globe,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  User,
  ArrowLeft,
} from "lucide-react-native";
import colors from "@/constants/Colors";
import typography from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";

export default function SettingsScreen() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            logout();
            router.replace("/(auth)");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleLanguageChange = () => {
    Alert.alert(
      "Select Language",
      "Choose your preferred language",
      [
        {
          text: "English",
          onPress: () => setLanguage("English"),
        },
        {
          text: "Amharic",
          onPress: () => setLanguage("Amharic"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleEditProfile}
          >
            <View style={styles.settingIconContainer}>
              <User size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Edit Profile</Text>
              <Text style={styles.settingDescription}>
                Change your profile information
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("Privacy Settings", "Privacy settings would be configured here.")}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: colors.secondary }]}>
              <Lock size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Privacy</Text>
              <Text style={styles.settingDescription}>
                Manage your privacy settings
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={[styles.settingIconContainer, { backgroundColor: colors.accent }]}>
              <Bell size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive notifications about activity
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.divider, true: `${colors.primary}80` }}
              thumbColor={notifications ? colors.primary : colors.white}
              ios_backgroundColor={colors.divider}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#6C5CE7" }]}>
              <Moon size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch between light and dark themes
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.divider, true: `${colors.primary}80` }}
              thumbColor={darkMode ? colors.primary : colors.white}
              ios_backgroundColor={colors.divider}
            />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLanguageChange}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: "#00B894" }]}>
              <Globe size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingDescription}>
                {language}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("Help Center", "Help center would open here.")}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: "#FF7675" }]}>
              <HelpCircle size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>
                Get help with using the app
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("About", "Ethiopian Recipe Share v1.0.0")}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: "#74B9FF" }]}>
              <Info size={20} color={colors.white} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>About</Text>
              <Text style={styles.settingDescription}>
                App information and version
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.heading3,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.heading4,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.lightText,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  versionText: {
    ...typography.caption,
    color: colors.lightText,
  },
});