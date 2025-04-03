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
  const styles = {
    ...createStyles(theme).questionHeader,
    headerRow: {
      ...createStyles(theme).questionHeader.headerRow,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    backButtonContainer: {
      ...createStyles(theme).questionHeader.backButtonContainer,
      position: "absolute",
      left: 0,
      zIndex: 1,
    },
    headerTitle: {
      ...createStyles(theme).questionHeader.headerTitle,
      flex: 0,
      textAlign: "center",
      width: "70%",
    },
  };

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
