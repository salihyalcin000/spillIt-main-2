import React from "react";
import { View, Animated } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const PaginationDots = ({ currentIndex, totalDots = 5 }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).paginationDots;

  const getVisibleDots = () => {
    return Array.from({ length: totalDots }, (_, i) => i);
  };

  const getDotProperties = (dotIndex) => {
    const distance = Math.abs(dotIndex - (currentIndex % totalDots));

    if (distance === 0) return { opacity: 1, scale: 1.2 };
    if (distance === 1) return { opacity: 0.6, scale: 1 };
    return { opacity: 0.3, scale: 0.9 };
  };

  return (
    <View style={styles.paginationContainer}>
      {getVisibleDots().map((dotIndex) => {
        const { opacity, scale } = getDotProperties(dotIndex);
        return (
          <Animated.View
            key={dotIndex}
            style={[
              styles.dot,
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationDots;
