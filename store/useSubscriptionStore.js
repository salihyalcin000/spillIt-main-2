import { create } from "zustand";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Set RevenueCat API Keys
const API_KEY =
  Platform.OS === "ios"
    ? "appl_GLIKcNEMrwDHRKzHAqmATksGYuo"
    : "appl_GLIKcNEMrwDHRKzHAqmATksGYuo";

Purchases.configure({ apiKey: API_KEY });

const useSubscriptionStore = create((set) => ({
  isSubscribed: false,
  offerings: null,


  checkSubscription: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isActive = customerInfo.entitlements.active["pro"] !== undefined;
      set({ isSubscribed: isActive });
      await AsyncStorage.setItem("subscriptionStatus", JSON.stringify(isActive));
      console.log("Subscription status:", isActive);
      return isActive;
    } catch (error) {
      console.error("Error checking subscription:", error);
      set({ isSubscribed: false });
      await AsyncStorage.setItem("subscriptionStatus", JSON.stringify(false));
      return false;
    }
  },
  

  restorePurchases: async () => {
    try {
      const restoredInfo = await Purchases.restorePurchases();
      const isActive = restoredInfo.entitlements.active["pro"] !== undefined;
      set({ isSubscribed: isActive });
      await AsyncStorage.setItem("subscriptionStatus", JSON.stringify(isActive));
      console.log("Restored Purchases:", restoredInfo);
      return isActive;
    } catch (error) {
      console.error("Error restoring purchases:", error);
      return false;
    }
  },
  

  // 🔹 Fetch available subscription plans
  fetchOfferings: async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        set({ offerings: offerings.current.availablePackages });
        console.log(
          "Available Offerings:",
          offerings.current.availablePackages
        );
      } else {
        set({ offerings: null });
      }
    } catch (error) {
      console.error("Error fetching offerings:", error);
    }
  },

  purchaseSubscription: async (selectedPackage) => {
    try {
      const purchase = await Purchases.purchasePackage(selectedPackage);
      console.log("Purchase successful:", purchase);
  
      const customerInfo = await Purchases.getCustomerInfo();
      const isActive = customerInfo.entitlements.active["pro"] !== undefined;
  
      set({ isSubscribed: isActive });
      await AsyncStorage.setItem("subscriptionStatus", JSON.stringify(isActive));
      console.log("Updated subscription status:", isActive);
  
      return purchase;
    } catch (error) {
      console.error("Error purchasing:", error);
      return null;
    }
  },
  
  initialize: async () => {
    try {
      await Purchases.configure({ apiKey: API_KEY });
  
      // Load stored subscription first
      const stored = await AsyncStorage.getItem("subscriptionStatus");
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        set({ isSubscribed: parsed });
        console.log("Loaded stored subscription status:", parsed);
      }
  
      // Then re-check live status
      const isActive = await useSubscriptionStore.getState().checkSubscription();
      console.log("Initial subscription status (live):", isActive);
      return isActive;
    } catch (error) {
      console.error("Error initializing subscription:", error);
      return false;
    }
  }
  


// Initialize subscription state when the store is created
useSubscriptionStore.getState().initialize();

export default useSubscriptionStore;