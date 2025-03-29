import { StyleSheet } from "react-native";

const questionCardStyles = StyleSheet.create({
  card: {
    height: "70%",
    backgroundColor: "#F2DCDC",
    borderRadius: 20,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    color: "#2E2E2E",
    fontWeight: "600",
    lineHeight: 32,
  },
  spillItContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2E2E2E",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  spillItText: {
    fontSize: 12,
    color: "#FAF8F7",
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  spillItDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F2DCDC",
  },
});

export default questionCardStyles;
