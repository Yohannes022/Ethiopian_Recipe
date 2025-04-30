import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 0.3,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 0.2,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: 0.2,
  },
  heading4: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: colors.lightText,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});