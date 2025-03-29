import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";
import useSubscriptionStore from "../store/useSubscriptionStore";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const SubscriptionModal = ({ visible, onCloseResumeModal }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).resumeModal;
  const { fetchOfferings, offerings, purchaseSubscription } =
    useSubscriptionStore();

  useEffect(() => {
    if (false && !offerings) {
      fetchOfferings();
    }
  }, [offerings]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[styles.modalOverlay, { padding: 0, position: "relative" }]}>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20, zIndex: 2 }}
          onPress={onCloseResumeModal}
        >
          <Entypo name="cross" size={32} color={theme.icon} />
        </TouchableOpacity>
        <View
          style={[
            styles.modalContent,
            {
              flex: 1,
              gap: 60,
              width: "100%",
              borderRadius: 0,
            },
          ]}
        >
          <View style={{ gap: 32, alignItems: "center" }}>
            <View>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/images/icon.png")}
                contentFit="cover"
              />
            </View>
            <View>
              <Text
                style={{ fontSize: 38, fontWeight: "900", textAlign: "center" }}
              >
                DEEP QUESTIONS COUPLE CONVOS GOSSIP SESHES
              </Text>
            </View>
          </View>
          <View style={{ gap: 16 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <FontAwesome5 name="unlock-alt" size={24} color={theme.icon} />
              <Text>Unlock all themes and topics</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Entypo name="infinity" size={24} color={theme.icon} />
              <Text>New questions added weekly</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <FontAwesome
                name="calendar-times-o"
                size={24}
                color={theme.icon}
              />
              <Text>Easily cancel anytime</Text>
            </View>
          </View>

          <View style={[styles.modalButtonsColumn, { marginTop: 20 }]}>
            {offerings ? (
              offerings.map((pack) => (
                <TouchableOpacity
                  style={[styles.modalButton, styles.resumeButton]}
                  onPress={() => purchaseSubscription(pack)}
                >
                  <Text style={styles.resumeButtonText}>Continue</Text>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                style={[styles.modalButton, styles.resumeButton]}
              >
                <Text style={[styles.resumeButtonText, { fontSize: 20 }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onCloseResumeModal}>
              <Text
                style={[
                  styles.startOverButtonText,
                  { textDecorationLine: "underline", fontSize: 18 },
                ]}
              >
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={onCloseResumeModal}>
              <Text
                style={[
                  styles.startOverButtonText,
                  { fontSize: 12, color: "#bbb" },
                ]}
              >
                Restore Previous Purchases
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={onCloseResumeModal}>
                <Text
                  style={[
                    styles.startOverButtonText,
                    { fontSize: 12, color: "#bbb" },
                  ]}
                >
                  Terms of Use
                </Text>
              </TouchableOpacity>
              <Text style={[{ fontSize: 12, color: "#bbb" }]}>•</Text>
              <TouchableOpacity onPress={onCloseResumeModal}>
                <Text
                  style={[
                    styles.startOverButtonText,
                    { fontSize: 12, color: "#bbb" },
                  ]}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubscriptionModal;
