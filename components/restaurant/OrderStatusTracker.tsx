/**
 * Order status tracker component
 * Displays the current status of an order with a visual timeline
 * Shows progress through order states: confirmed, preparing, ready, out for delivery, delivered
 * Provides special UI for cancelled orders
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Check } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import { OrderStatus } from "@/types/restaurant";

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

export default function OrderStatusTracker({
  currentStatus,
}: OrderStatusTrackerProps) {
  // Define the order status flow with labels
  const statuses: { key: OrderStatus; label: string }[] = [
    { key: "confirmed", label: "Confirmed" },
    { key: "preparing", label: "Preparing" },
    { key: "ready_for_pickup", label: "Ready for Pickup" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  // Find the index of the current status
  const currentIndex = statuses.findIndex((status) => status.key === currentStatus);
  
  // If order is cancelled, show a different UI
  if (currentStatus === "cancelled") {
    return (
      <View style={styles.cancelledContainer}>
        <Text style={styles.cancelledText}>Order Cancelled</Text>
        <Text style={styles.cancelledDescription}>
          This order has been cancelled. Please contact customer support if you have any questions.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {statuses.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <React.Fragment key={status.key}>
            {/* Status circle */}
            <View style={styles.statusItem}>
              <View
                style={[
                  styles.statusCircle,
                  isCompleted && styles.completedCircle,
                  isActive && styles.activeCircle,
                ]}
              >
                {isCompleted && <Check size={16} color={colors.white} />}
              </View>
              <Text
                style={[
                  styles.statusText,
                  isCompleted && styles.completedText,
                  isActive && styles.activeText,
                ]}
              >
                {status.label}
              </Text>
            </View>
            
            {/* Connector line */}
            {index < statuses.length - 1 && (
              <View
                style={[
                  styles.connector,
                  index < currentIndex && styles.completedConnector,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statusItem: {
    alignItems: "center",
    width: 70,
  },
  statusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.divider,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  completedCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeCircle: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  statusText: {
    ...typography.caption,
    color: colors.lightText,
    textAlign: "center",
  },
  completedText: {
    color: colors.text,
    fontWeight: "500",
  },
  activeText: {
    color: colors.primary,
    fontWeight: "600",
  },
  connector: {
    height: 2,
    flex: 1,
    backgroundColor: colors.divider,
  },
  completedConnector: {
    backgroundColor: colors.primary,
  },
  cancelledContainer: {
    backgroundColor: colors.error + "15", // Light red background
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cancelledText: {
    ...typography.heading4,
    color: colors.error,
    marginBottom: 8,
  },
  cancelledDescription: {
    ...typography.bodySmall,
    color: colors.text,
    textAlign: "center",
  },
});