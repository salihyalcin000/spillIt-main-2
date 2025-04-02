import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image, Linking } from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";
import useSubscriptionStore from "../store/useSubscriptionStore";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const PRIVACY_POLICY_URL = "https://island-banana-8a6.notion.site/Privacy-Policy-for-Spill-It-1c644938f4f580e3b889d96a5a9bca6e?pvs=4";
const TERMS_OF_USE_URL = "https://island-banana-8a6.notion.site/Spill-It-Cards-Terms-of-Use-1c644938f4f58097969ad23839007fe0";

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

  const openPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  const openTermsOfUse = () => {
    Linking.openURL(TERMS_OF_USE_URL);
  };

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
              gap: 40,
              width: "100%",
              borderRadius: 0,
              justifyContent: "center",
              paddingTop: 40,
            },
          ]}
        >
          <View style={{ gap: 32, alignItems: "center", marginTop: 60 }}>
            <View>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/images/icon.png")}
                contentFit="cover"
              />
            </View>
            <View>
              <Text
                style={{ fontSize: 36, fontWeight: "900", textAlign: "center" }}
              >
                DEEP QUESTIONS COUPLE CONVOS GOSSIP SESHES
              </Text>
            </View>
          </View>
          <View style={{ gap: 16, marginTop: 20 }}>
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

          <View style={[styles.modalButtonsColumn, { marginTop: 40 }]}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: "700", 
              textAlign: "center", 
              marginBottom: 10,
              color: "#FF7F00"
            }}>
              3 DAYS FREE TRIAL
            </Text>
            {offerings ? (
              offerings.map((pack) => (
                <TouchableOpacity
                  key={pack.identifier}
                  style={[
                    styles.modalButton, 
                    styles.resumeButton,
                    { height: 60, justifyContent: "center" }
                  ]}
                  onPress={() => purchaseSubscription(pack)}
                >
                  <Text style={[styles.resumeButtonText, { fontSize: 22 }]}>
                    Continue
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                style={[
                  styles.modalButton, 
                  styles.resumeButton,
                  { height: 60, justifyContent: "center" }
                ]}
              >
                <Text style={[styles.resumeButtonText, { fontSize: 22 }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onCloseResumeModal}>
              <Text
                style={[
                  styles.startOverButtonText,
                  { textDecorationLine: "underline", fontSize: 18, marginTop: 10 },
                ]}
              >
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 8, marginTop: 30 }}>
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
            <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
              <TouchableOpacity onPress={openTermsOfUse}>
                <Text
                  style={[
                    styles.startOverButtonText,
                    { fontSize: 12, color: "#bbb", textDecorationLine: "underline" },
                  ]}
                >
                  Terms of Use
                </Text>
              </TouchableOpacity>
              <Text style={[{ fontSize: 12, color: "#bbb" }]}>•</Text>
              <TouchableOpacity onPress={openPrivacyPolicy}>
                <Text
                  style={[
                    styles.startOverButtonText,
                    { fontSize: 12, color: "#bbb", textDecorationLine: "underline" },
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
