import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";
import useSubscriptionStore from "../store/useSubscriptionStore";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const PRIVACY_POLICY_URL =
  "https://island-banana-8a6.notion.site/Privacy-Policy-for-Spill-It-1c644938f4f580e3b889d96a5a9bca6e?pvs=4";
const TERMS_OF_USE_URL =
  "https://island-banana-8a6.notion.site/Spill-It-Cards-Terms-of-Use-1c644938f4f58097969ad23839007fe0";

const SubscriptionModal = ({ visible, onCloseResumeModal }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme).resumeModal;
  const { fetchOfferings, offerings, purchaseSubscription, checkSubscription } =
    useSubscriptionStore();

  // Animation value for the button
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Start the pulsing animation when the modal is visible
  useEffect(() => {
    if (visible) {
      startPulseAnimation();
    }
  }, [visible]);

  // Pulse animation function
  const startPulseAnimation = () => {
    Animated.sequence([
      // Scale up
      Animated.timing(pulseAnim, {
        toValue: 1.05,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Scale back
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(startPulseAnimation, 200);
    });
  };

  useEffect(() => {
    if (!offerings) {
      fetchOfferings();
    }
  }, [offerings]);

  const handlePurchase = async (pack) => {
    const purchase = await purchaseSubscription(pack);
    if (purchase) {
      // Double check subscription status
      const isActive = await checkSubscription();
      if (isActive) {
        onCloseResumeModal();
      }
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  const openTermsOfUse = () => {
    Linking.openURL(TERMS_OF_USE_URL);
  };

  useEffect(() => {
    checkSubscription();
  }, []);
  

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[styles.modalOverlay, { padding: 0, position: "relative" }]}>
        <TouchableOpacity
          style={{ position: "absolute", top: 60, right: 20, zIndex: 2 }}
          onPress={onCloseResumeModal}
        >
          <Entypo name="cross" size={28} color={theme.icon} />
        </TouchableOpacity>
        <View
          style={[
            styles.modalContent,
            {
              flex: 1,
              width: "100%",
              borderRadius: 0,
              paddingTop: 60,
              paddingBottom: 20,
              justifyContent: "center", // Center content vertically
            },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 140, height: 140, borderRadius: 20 }}
              source={require("../assets/images/icon.png")}
              contentFit="cover"
            />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "900",
                textAlign: "center",
                marginTop: 30,
                marginBottom: 30,
                paddingHorizontal: 10,
              }}
            >
              DEEP QUESTIONS COUPLE CONVOS GOSSIP SESHES
            </Text>
          </View>

          <View style={{ gap: 12, marginBottom: 50 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <FontAwesome5 name="unlock-alt" size={24} color={theme.icon} />
              <Text style={{ fontSize: 16 }}>Unlock all themes and topics</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Entypo name="infinity" size={24} color={theme.icon} />
              <Text style={{ fontSize: 16 }}>New questions added weekly</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <FontAwesome
                name="calendar-times-o"
                size={24}
                color={theme.icon}
              />
              <Text style={{ fontSize: 16 }}>Easily cancel anytime</Text>
            </View>
          </View>

          <View style={styles.modalButtonsColumn}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 5,
                color: "#FF7F00",
              }}
            >
              3 DAYS FREE TRIAL
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 10,
                color: "#FF3B30",
              }}
            >
              $5.99/week
            </Text>
            {/* <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                textAlign: "center",
                marginBottom: 15,
                color: "#999",
              }}
            >
              No Commitment. Cancel anytime
            </Text> */}
            {offerings ? (
              offerings.map((pack) => (
                <Animated.View
                  key={pack.identifier}
                  style={{ transform: [{ scale: pulseAnim }] }}
                >
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.resumeButton,
                      { height: 80, justifyContent: "center" },
                    ]}
                    onPress={() => handlePurchase(pack)}
                  >
                    <Text style={[styles.resumeButtonText, { fontSize: 26 }]}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))
            ) : (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.resumeButton,
                    { height: 80, justifyContent: "center" },
                  ]}
                >
                  <Text style={[styles.resumeButtonText, { fontSize: 26 }]}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity onPress={onCloseResumeModal}>
              <Text
                style={[
                  styles.startOverButtonText,
                  {
                    fontSize: 12,
                    color: "#bbb",
                    textAlign: "center",
                    marginBottom: 8,
                  },
                ]}
              >
                Restore Previous Purchases
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={openTermsOfUse}>
                <Text
                  style={[
                    styles.startOverButtonText,
                    {
                      fontSize: 12,
                      color: "#bbb",
                      textDecorationLine: "underline",
                    },
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
                    {
                      fontSize: 12,
                      color: "#bbb",
                      textDecorationLine: "underline",
                    },
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