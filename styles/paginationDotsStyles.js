import { StyleSheet } from "react-native";

const paginationDotsStyles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E2E2E",
    marginHorizontal: 4,
  },
});

export default paginationDotsStyles;
