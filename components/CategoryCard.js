import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryCard({ item, index, theme, onPress, styles }) {
  const categoryData = item.categoryData;
  const description = categoryData?.description || "No description available";
  const emoji = categoryData?.emoji || "📝";
  const isLocked = index !== 0;

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <View style={styles.descriptionContainer}>
            {isLocked ? (
              <Text style={styles.descriptionText}>
                {description}{" "}
                <Ionicons name="lock-closed" size={14} color="#DAA520" />
              </Text>
            ) : (
              <Text style={styles.descriptionText}>{description}</Text>
            )}
          </View>
        </View>
        <Text style={styles.emojiText}>{emoji}</Text>
      </View>
    </TouchableOpacity>
  );
}
