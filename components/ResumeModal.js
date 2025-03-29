import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const ResumeModal = ({
  visible,
  savedProgress,
  totalQuestions,
  onStartOver,
  onResume,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).resumeModal;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Welcome Back!</Text>

          {/* Progress indicator */}
          <View style={styles.modalProgressContainer}>
            <View style={styles.modalProgressBar}>
              <View
                style={[
                  styles.modalProgressFill,
                  { width: `${(savedProgress / totalQuestions) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.modalProgressText}>
              {totalQuestions - savedProgress} cards remaining
            </Text>
          </View>

          <View style={styles.modalButtonsColumn}>
            <TouchableOpacity
              style={[styles.modalButton, styles.startOverButton]}
              onPress={onStartOver}
            >
              <Text style={styles.startOverButtonText}>Start Over</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.resumeButton]}
              onPress={onResume}
            >
              <Text style={styles.resumeButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ResumeModal;
