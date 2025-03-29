import React from "react";
import { ThemeProvider } from "./styles/theme/ThemeContext";

export default function App(props) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}
