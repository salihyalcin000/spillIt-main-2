import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/colors";

export default function Layout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}
    >
      <StatusBar style="dark" backgroundColor={COLORS.BACKGROUND} />
      <Slot />
    </GestureHandlerRootView>
  );
}
