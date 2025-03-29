import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export default function HelpModal({ visible, onClose, styles }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How to Use</Text>
          <Text style={styles.modalText}>
            1. Choose your theme from the bottom tabs{"\n"}
            2. Select a pack to start exploring new questions{"\n"}
            3. Swipe or use navigation buttons to move between cards
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
