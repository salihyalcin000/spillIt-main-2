import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const QuestionHeader = ({
  title,
  currentIndex,
  totalQuestions,
  onBackPress,
  onSharePress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).questionHeader;

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={theme.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={[styles.backButtonContainer, styles.shareButton]}
          onPress={onSharePress}
        >
          <Text style={styles.shareIcon}>⤤</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {totalQuestions}
        </Text>
      </View>
    </View>
  );
};

export default QuestionHeader;
