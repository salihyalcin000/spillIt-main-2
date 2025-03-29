import { StyleSheet } from "react-native";

const questionScreenStyles = StyleSheet.create({
  // Main containers
  container: {
    flex: 1,
    backgroundColor: "#FAF8F7",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },

  // Loading state
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#2E2E2E",
  },

  // Error state
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
  },
  retryButtonText: {
    color: "#FAF8F7",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: "#2E2E2E",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default questionScreenStyles;
