import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingState({ styles }) {
  return (
    <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#2E2E2E" />
      <Text style={styles.loadingText}>Loading questions...</Text>
    </SafeAreaView>
  );
}
