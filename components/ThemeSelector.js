import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ThemeSelector({
  types,
  selectedType,
  onTypeChange,
  styles,
}) {
  return (
    <View style={styles.typeSelector}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            selectedType === type && styles.activeTypeButton,
          ]}
          onPress={() => onTypeChange(type)}
        >
          <Text
            style={[
              styles.typeText,
              selectedType === type && styles.activeTypeText,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
