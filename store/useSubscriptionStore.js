import { create } from "zustand";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";

// Set RevenueCat API Keys
const API_KEY =
  Platform.OS === "ios"
    ? "appl_CdCKLagNzygWrtJiskaUVdStykY"
    : "appl_CdCKLagNzygWrtJiskaUVdStykY";

Purchases.configure({ apiKey: API_KEY });

const useSubscriptionStore = create((set) => ({
  isSubscribed: false,
  offerings: null,

  // 🔹 Check if user has an active subscription
  checkSubscription: async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isActive =
        customerInfo.entitlements.active["pro_weekly"] !== undefined;
      set({ isSubscribed: isActive });
      console.log("Subscription status:", isActive);
    } catch (error) {
      console.error("Error checking subscription:", error);
      set({ isSubscribed: false });
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
    } catch (error) {
      console.error("Error restoring purchases:", error);
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
      set({ isSubscribed: isActive });

      return purchase;
    } catch (error) {
      console.error("Error purchasing:", error);
      return null;
    }
  },
}));

export default useSubscriptionStore;
