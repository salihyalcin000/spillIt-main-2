import { StyleSheet } from "react-native";

const navigationButtonsStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 20,
  },
  textButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    backgroundColor: "#2E2E2E",
  },
  nextButton: {
    backgroundColor: "#2E2E2E",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  disabledTextButton: {
    backgroundColor: "#EBEBEB",
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButtonText: {
    color: "#BBBBBB",
  },
});

export default navigationButtonsStyles;
