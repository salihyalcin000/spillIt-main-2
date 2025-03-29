import React from "react";
import { View, Text, Animated } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const QuestionCard = ({ question, panHandlers, slideAnim }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).questionCard;

  return (
    <Animated.View
      style={[styles.card, { transform: [{ translateX: slideAnim }] }]}
      {...panHandlers}
    >
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.spillItContainer}>
        <Text style={styles.spillItText}>SPILL IT</Text>
        <View style={styles.spillItDot} />
      </View>
    </Animated.View>
  );
};

export default QuestionCard;
