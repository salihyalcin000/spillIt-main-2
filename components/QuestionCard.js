import React from "react";
import { View, Text, Animated } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const QuestionCard = ({ question }) => {
  const { theme } = useTheme();
  const styles = {
    ...createStyles(theme).questionCard,
    card: {
      ...createStyles(theme).questionCard.card,
      width: "100%",
      height: "100%",
      // Ensure vertical content is centered nicely
      justifyContent: "center",
    },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.spillItContainer}>
        <Text style={styles.spillItText}>SPILL IT</Text>
        <View style={styles.spillItDot} />
      </View>
    </View>
  );
};

export default QuestionCard;
