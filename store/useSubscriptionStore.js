import { create } from "zustand";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
// Set RevenueCat API Keys
const API_KEY =
  Platform.OS === "ios"
    ? "appl_GLIKcNEMrwDHRKzHAqmATksGYuo"
    : "appl_GLIKcNEMrwDHRKzHAqmATksGYuo";

Purchases.configure({ apiKey: API_KEY });

const useSubscriptionStore = create((set) => ({
  isSubscribed: false,
  offerings: null,

  // 🔹 Check if user has an active subscription
  checkSubscription: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      
      // Check if subscription is active and not expired
      const entitlement = customerInfo.entitlements.active["pro_weekly"];
      const isActive = entitlement !== undefined;
      
      // If active, verify expiration
      let isValid = isActive;
      if (isActive && entitlement.expirationDate) {
        const expirationDate = new Date(entitlement.expirationDate);
        const now = new Date();
        isValid = expirationDate > now;
      }
      
      set({ isSubscribed: isValid });
      return isValid;
    } catch (error) {
      console.error("Error checking subscription:", error);
      set({ isSubscribed: false });
      return false;
    }
  },



  // 🔹 Restore purchases (for users reinstalling or switching devices)
  restorePurchases: async () => {
    try {
      const restoredInfo = await Purchases.restorePurchases();
      const isActive =
        restoredInfo.entitlements.active["pro_weekly"] !== undefined;
      set({ isSubscribed: isActive });
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

  // 🔹 Purchase a subscription
  purchaseSubscription: async (selectedPackage) => {
    try {
      const purchase = await Purchases.purchasePackage(selectedPackage);
      console.log("Purchase successful:", purchase);

      // Refresh subscription status
      const customerInfo = await Purchases.getCustomerInfo();
      const isActive =
        customerInfo.entitlements.active["pro_weekly"] !== undefined;
      
      // Update subscription state
      set({ isSubscribed: isActive });
      console.log("Updated subscription status:", isActive);

      return purchase;
    } catch (error) {
      console.error("Error purchasing:", error);
      return null;
    }
  },

  // 🔹 Initialize subscription state
  initialize: async () => {
    try {
      await Purchases.configure({ apiKey: API_KEY });
      const isActive = await useSubscriptionStore.getState().checkSubscription();
      console.log("Initial subscription status:", isActive);
      return isActive;
    } catch (error) {
      console.error("Error initializing subscription:", error);
      return false;
    }
  }
}));

// Add initialization from storage
initializeFromStorage: async () => {
  try {
    const storedStatus = await AsyncStorage.getItem('subscriptionStatus');
    if (storedStatus !== null) {
      set({ isSubscribed: JSON.parse(storedStatus) });
    }
  } catch (error) {
    console.error("Error loading subscription from storage:", error);
  }
}

// Initialize subscription state when the store is created
useSubscriptionStore.getState().initialize();

export default useSubscriptionStore;
