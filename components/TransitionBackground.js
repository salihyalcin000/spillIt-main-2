import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransitionBackground({ styles }) {
  return (
    <View style={styles.transitionContainer}>
      <View style={styles.transitionContent}>
        <Text style={styles.transitionEmoji}>✨</Text>
      </View>
    </View>
  );
}
