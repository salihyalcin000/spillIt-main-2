import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ onHelpPress, onSettingsPress, styles }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Select a Pack</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={onHelpPress}>
            <Text style={styles.headerButtonText}>ⓘ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onSettingsPress}
          >
            <Text style={styles.headerButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>
    </View>
  );
}
