import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Style generator function that takes theme as argument
const createStyles = (theme) => {
  return {
    // Main containers
    safeArea: {
      flex: 1,
      backgroundColor: "#FAF8F7",
    },
    container: {
      flex: 1,
      paddingBottom: 90,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: "#FAF8F7",
    },
    animatedContent: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#FAF8F7",
    },

    // Header styles
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: "#FAF8F7",
      borderBottomWidth: 1,
      borderBottomColor: "#E5E5E5",
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    headerButtons: {
      flexDirection: "row",
      gap: 10,
    },
    headerButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#F2DCDC",
      justifyContent: "center",
      alignItems: "center",
    },
    headerButtonText: {
      fontSize: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2E2E2E",
      marginBottom: 10,
    },

    // Progress bar
    progressBarBackground: {
      height: 4,
      backgroundColor: "#C8D3C1",
      borderRadius: 2,
      overflow: "hidden",
    },
    progressBarFill: {
      height: 4,
      backgroundColor: "#2E2E2E",
      width: "100%",
    },

    // Category list and cards
    categories: {
      paddingVertical: 20,
    },
    categoryCard: {
      backgroundColor: "#F2DCDC",
      borderRadius: 15,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      minHeight: 80,
    },
    cardContent: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTextContainer: {
      flex: 1,
      marginRight: 15,
    },
    categoryText: {
      color: "#2E2E2E",
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    descriptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    descriptionText: {
      color: "#666",
      fontSize: 13.5,
      lineHeight: 19,
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0.2,
      opacity: 0.85,
    },
    emojiText: {
      fontSize: 32,
    },

    // Theme selector
    typeSelector: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 20,
      backgroundColor: "#FAF8F7",
      borderTopWidth: 1,
      borderTopColor: "#E5E5E5",
    },
    typeButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: "#E5E5E5",
    },
    activeTypeButton: {
      backgroundColor: "#2E2E2E",
    },
    typeText: {
      color: "#2E2E2E",
      fontSize: 16,
      fontWeight: "500",
    },
    activeTypeText: {
      color: "#FAF8F7",
      fontWeight: "600",
    },

    // Modal styles
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "#FAF8F7",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#2E2E2E",
      marginBottom: 16,
      textAlign: "center",
    },
    modalText: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: "#2E2E2E",
      padding: 16,
      borderRadius: 16,
      alignItems: "center",
    },
    modalButtonText: {
      color: "#FAF8F7",
      fontSize: 16,
      fontWeight: "600",
    },

    // Settings modal specific
    settingsButton: {
      backgroundColor: "#2E2E2E",
      padding: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 16,
    },
    settingsButtonText: {
      color: "#FAF8F7",
      fontSize: 16,
      fontWeight: "600",
    },
    socialIconsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 24,
      marginTop: "auto",
      paddingTop: 20,
    },
    socialIconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#F2DCDC",
      justifyContent: "center",
      alignItems: "center",
    },

    // Transition animation
    transitionContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAF8F7",
    },
    transitionContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    transitionEmoji: {
      fontSize: 40,
      opacity: 0.5,
      transform: [{ rotate: "45deg" }],
    },

    // Loading and error states
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: "#2E2E2E",
    },
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
    },
    retryButtonText: {
      color: "#FAF8F7",
      fontSize: 16,
      fontWeight: "600",
    },

    // Theme toggle (for settings modal)
    themeToggleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingVertical: 8,
    },
    themeToggleText: {
      fontSize: 16,
      color: "#2E2E2E",
      fontWeight: "500",
    },

    // Question screen styles
    questionScreen: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
      },
      contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
      },
      loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.textPrimary,
      },
      errorContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      errorText: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.textPrimary,
        marginBottom: 8,
      },
      errorSubtext: {
        fontSize: 14,
        color: theme.textSecondary,
        textAlign: "center",
        marginBottom: 20,
      },
      retryButton: {
        backgroundColor: theme.buttonPrimary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginBottom: 12,
      },
      retryButtonText: {
        color: theme.buttonText,
        fontSize: 16,
        fontWeight: "600",
      },
      backButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      backButtonText: {
        color: theme.textPrimary,
        fontSize: 16,
        fontWeight: "500",
      },
    }),

    // Question header styles
    questionHeader: StyleSheet.create({
      header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.backgroundPrimary,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
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
        backgroundColor: theme.backgroundCard,
        justifyContent: "center",
        alignItems: "center",
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.textPrimary,
        flex: 1,
        textAlign: "center",
      },
      progressContainer: {
        marginBottom: 20,
      },
      progressBarBackground: {
        height: 4,
        backgroundColor: theme.progressBackground,
        borderRadius: 2,
        overflow: "hidden",
      },
      progressBarFill: {
        height: 4,
        backgroundColor: theme.progressBar,
      },
      progressText: {
        marginTop: 8,
        color: theme.textSecondary,
        fontSize: 14,
        fontWeight: "500",
      },
      shareButton: {
        backgroundColor: theme.buttonPrimary,
      },
      shareIcon: {
        fontSize: 22,
        color: theme.buttonText,
        transform: [{ rotate: "-45deg" }],
        marginTop: -2,
      },
    }),

    // Question card styles
    questionCard: StyleSheet.create({
      card: {
        height: "80%",
        backgroundColor: theme.question,
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
        color: theme.textPrimary,
        fontWeight: "600",
        lineHeight: 32,
      },
      spillItContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: theme.spillItContainer,
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
        color: theme.spillItText,
        fontWeight: "800",
        letterSpacing: 1.5,
      },
      spillItDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.spillItDot,
      },
    }),

    // Navigation buttons styles
    navigationButtons: StyleSheet.create({
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
        backgroundColor: theme.buttonPrimary,
      },
      nextButton: {
        backgroundColor: theme.buttonPrimary,
      },
      backButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.buttonText,
        textAlign: "center",
      },
      nextButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.buttonText,
        textAlign: "center",
      },
      disabledTextButton: {
        backgroundColor: theme.buttonDisabled,
        shadowOpacity: 0,
        elevation: 0,
      },
      disabledButtonText: {
        color: theme.buttonTextDisabled,
      },
    }),

    // Pagination dots styles
    paginationDots: StyleSheet.create({
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
        backgroundColor: theme.textPrimary,
        marginHorizontal: 4,
      },
    }),

    // Resume modal styles
    resumeModal: StyleSheet.create({
      modalOverlay: {
        flex: 1,
        backgroundColor: theme.modalBackground,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      modalContent: {
        backgroundColor: theme.backgroundPrimary,
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
        color: theme.textPrimary,
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
        backgroundColor: theme.border,
        borderRadius: 3,
        marginBottom: 8,
        overflow: "hidden",
      },
      modalProgressFill: {
        height: "100%",
        backgroundColor: theme.progressBar,
        borderRadius: 3,
      },
      modalProgressText: {
        fontSize: 14,
        color: theme.textSecondary,
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
        backgroundColor: theme.buttonSecondary,
        marginBottom: 12,
      },
      resumeButton: {
        backgroundColor: theme.buttonPrimary,
      },
      startOverButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.textSecondary,
        textAlign: "center",
      },
      resumeButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.buttonText,
        textAlign: "center",
      },
    }),

    subscriptionModal: StyleSheet.create({
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
      closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F2DCDC",
        justifyContent: "center",
        alignItems: "center",
      },
      closeButtonText: {
        fontSize: 24,
        color: "#2E2E2E",
        fontWeight: "600",
      },
    }),
  };
};

export default createStyles;
