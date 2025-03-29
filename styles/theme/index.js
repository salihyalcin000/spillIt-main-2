import { colors } from "./colors";

/**
 * Main theme definition
 */
export const lightTheme = {
  // Text colors
  textPrimary: colors.neutral900,
  textSecondary: colors.neutral600,
  textDisabled: colors.neutral400,
  textInverse: colors.white,

  // Background colors
  backgroundPrimary: colors.neutral50,
  backgroundSecondary: colors.white,
  backgroundCard: colors.primary,
  backgroundProgress: colors.secondary,

  // Button colors
  buttonPrimary: colors.neutral900,
  buttonSecondary: colors.neutral200,
  buttonDisabled: colors.neutral200,
  buttonText: colors.white,
  buttonTextDisabled: colors.neutral500,

  // Border colors
  border: colors.neutral300,

  // Icon colors
  icon: colors.neutral900,
  iconSecondary: colors.neutral600,
  iconDisabled: colors.neutral400,
  iconHighlight: colors.tertiary,

  // Special UI elements
  badge: colors.neutral900,
  badgeText: colors.white,
  question: colors.primary,
  progressBar: colors.neutral900,
  progressBackground: colors.secondary,
  modalBackground: "rgba(0,0,0,0.5)",
  spillItContainer: colors.neutral900,
  spillItText: colors.neutral50,
  spillItDot: colors.primary,

  // Status
  error: colors.error,
  success: colors.success,
  warning: colors.warning,
  info: colors.info,
};

// Default theme
export default lightTheme;
