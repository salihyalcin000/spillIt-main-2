import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const NavigationButtons = ({
  currentIndex,
  totalQuestions,
  onPreviousPress,
  onNextPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).navigationButtons;

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[
          styles.textButton,
          styles.backButton,
          currentIndex === 0 && styles.disabledTextButton,
        ]}
        onPress={onPreviousPress}
        disabled={currentIndex === 0}
      >
        <Text
          style={[
            styles.backButtonText,
            currentIndex === 0 && styles.disabledButtonText,
          ]}
        >
          Back
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.textButton,
          styles.nextButton,
          currentIndex === totalQuestions - 1 && styles.disabledTextButton,
        ]}
        onPress={onNextPress}
        disabled={currentIndex === totalQuestions - 1}
      >
        <Text
          style={[
            styles.nextButtonText,
            currentIndex === totalQuestions - 1 && styles.disabledButtonText,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationButtons;
