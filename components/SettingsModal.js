import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../styles/theme/ThemeContext";

const { height } = Dimensions.get("window");

const SettingsModal = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 80,
      }).start();
    } else {
      slideAnim.setValue(height);
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 80,
          }).start();
        }
      },
    })
  ).current;

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const shareApp = () => {
    // Your existing share functionality
    try {
      Linking.openURL("https://spillitapp.com");
    } catch (error) {
      console.log("Error sharing app:", error);
    }
  };

  // Create custom styles for this component
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: theme.modalBackground,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: theme.backgroundPrimary,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 44, // Extra padding at bottom for better look
      width: "100%",
    },
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.textPrimary,
      textAlign: "center",
    },
    socialLinks: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 24,
    },
    socialButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.buttonSecondary,
      justifyContent: "center",
      alignItems: "center",
    },
    shareButton: {
      backgroundColor: theme.buttonPrimary,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 16,
      alignItems: "center",
      marginTop: 10,
    },
    shareButtonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
              {...panResponder.panHandlers}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
              </View>

              <View style={styles.socialLinks}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() =>
                    openLink("https://instagram.com/spillitcardreels")
                  }
                >
                  <Ionicons
                    name="logo-instagram"
                    size={24}
                    color={theme.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() =>
                    openLink("https://tiktok.com/@spillitcardreels")
                  }
                >
                  <Ionicons name="logo-tiktok" size={24} color={theme.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => openLink("mailto:roopamgupta68@gmail.com")}
                >
                  <Ionicons name="mail" size={24} color={theme.icon} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.shareButton} onPress={shareApp}>
                <Text style={styles.shareButtonText}>Share App</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettingsModal;
