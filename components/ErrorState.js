import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ErrorState({ error, onRetry, styles }) {
  return (
    <SafeAreaView style={[styles.safeArea, styles.errorContainer]}>
      <Text style={styles.errorText}>Something went wrong</Text>
      <Text style={styles.errorSubtext}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
