import { StyleSheet } from "react-native";

const questionHeaderStyles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FAF8F7",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2DCDC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E2E2E",
    flex: 1,
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#C8D3C1",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 4,
    backgroundColor: "#2E2E2E",
  },
  progressText: {
    marginTop: 8,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  shareButton: {
    backgroundColor: "#2E2E2E",
  },
  shareIcon: {
    fontSize: 22,
    color: "#FAF8F7",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
});

export default questionHeaderStyles;
