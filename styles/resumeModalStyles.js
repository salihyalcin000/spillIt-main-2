import { StyleSheet } from "react-native";

const resumeModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FAF8F7",
    borderRadius: 24,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 20,
    textAlign: "center",
  },
  modalProgressContainer: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  modalProgressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E5E5E5",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  modalProgressFill: {
    height: "100%",
    backgroundColor: "#2E2E2E",
    borderRadius: 3,
  },
  modalProgressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  modalButtonsColumn: {
    width: "100%",
    alignItems: "stretch",
  },
  modalButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  startOverButton: {
    backgroundColor: "#E5E5E5",
    marginBottom: 12,
  },
  resumeButton: {
    backgroundColor: "#2E2E2E",
  },
  startOverButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
  },
  resumeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default resumeModalStyles;
