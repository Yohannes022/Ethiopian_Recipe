/**
 * Payment method selector component
 * Allows users to select a payment method for checkout
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CreditCard, Smartphone, DollarSign, Plus } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import { usePaymentStore } from "@/store/paymentStore";

interface PaymentMethodSelectorProps {
  selectedMethodId: string | null;
  onSelect: (methodId: string) => void;
  onAddNew: () => void;
}

export default function PaymentMethodSelector({
  selectedMethodId,
  onSelect,
  onAddNew,
}: PaymentMethodSelectorProps) {
  const { paymentMethods } = usePaymentStore();

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "credit_card":
      case "debit_card":
        return <CreditCard size={24} color={colors.text} />;
      case "mobile_money":
        return <Smartphone size={24} color={colors.text} />;
      case "cash":
        return <DollarSign size={24} color={colors.text} />;
      default:
        return <CreditCard size={24} color={colors.text} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.methodsContainer}
      >
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethodId === method.id && styles.selectedMethodCard,
            ]}
            onPress={() => onSelect(method.id)}
          >
            <View style={styles.methodIcon}>
              {getPaymentIcon(method.type)}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              {method.expiryDate && (
                <Text style={styles.methodDetail}>Expires: {method.expiryDate}</Text>
              )}
            </View>
            <View style={styles.radioButton}>
              {selectedMethodId === method.id && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={styles.addMethodCard}
          onPress={onAddNew}
        >
          <Plus size={24} color={colors.primary} />
          <Text style={styles.addMethodText}>Add Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    ...typography.heading4,
    marginBottom: 16,
  },
  methodsContainer: {
    paddingBottom: 8,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  selectedMethodCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10", // Light primary color
  },
  methodIcon: {
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    ...typography.bodySmall,
    fontWeight: "600",
    marginBottom: 4,
  },
  methodDetail: {
    ...typography.caption,
    color: colors.lightText,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  addMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    width: 220,
    borderWidth: 1,
    borderColor: colors.divider,
    borderStyle: "dashed",
  },
  addMethodText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: "600",
    marginLeft: 8,
  },
});