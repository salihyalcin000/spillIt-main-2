import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Share,
  BackHandler,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ResumeModal from "../../../components/ResumeModal";
import QuestionCard from "../../../components/QuestionCard";
import QuestionHeader from "../../../components/QuestionHeader";
import NavigationButtons from "../../../components/NavigationButtons";
import PaginationDots from "../../../components/PaginationDots";
import { useTheme } from "../../../styles/theme/ThemeContext";
import createStyles from "../../../styles/appStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_VELOCITY_THRESHOLD = 0.3;
const CARD_WIDTH = SCREEN_WIDTH - 40;
const CARD_SPACING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// Fallback questions if data loading fails
const FALLBACK_QUESTIONS = [
  "Oops, we couldn't load questions right now.",
  "Please check your internet connection and try again.",
  "You can always come back later!",
];

export default function QuestionScreen() {
  const { theme } = useTheme();
  const styles = {
    ...createStyles(theme).questionScreen,
    cardContainer: {
      width: CARD_WIDTH,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: -30,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const { type, category, theme: routeTheme } = useLocalSearchParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);

  // For animation
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = Animated.divide(scrollX, SCREEN_WIDTH);
  const flatListRef = useRef(null);

  // Store progress in memory
  useEffect(() => {
    return () => {
      // When component unmounts, save the current index as "saved progress"
      if (currentIndex > 0) {
        global.questionProgress = global.questionProgress || {};
        global.questionProgress[`${type}_${category}`] = currentIndex;
      }
    };
  }, [currentIndex, type, category]);

  useEffect(() => {
    fetchQuestions();

    // Handle hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true; // Prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://raw.githubusercontent.com/whoroopamgupta/questions.json/main/questions.json"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      if (
        jsonData &&
        jsonData[type] &&
        jsonData[type].categoryDetails &&
        jsonData[type].categoryDetails[category] &&
        jsonData[type].categoryDetails[category].questions
      ) {
        const loadedQuestions =
          jsonData[type].categoryDetails[category].questions;
        setQuestions(loadedQuestions);

        // Check for saved progress once data is loaded
        checkProgress();

        // If no saved progress and questions are loaded, ensure we're at the first question
        if (
          !global.questionProgress?.[`${type}_${category}`] &&
          loadedQuestions.length > 0
        ) {
          setCurrentIndex(0);
        }
      } else {
        throw new Error("Questions not found in data structure");
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message);
      setQuestions(FALLBACK_QUESTIONS);
      setIsLoading(false);
    }
  };

  // Simple in-memory progress check
  const checkProgress = () => {
    if (
      global.questionProgress &&
      global.questionProgress[`${type}_${category}`]
    ) {
      const savedIndex = global.questionProgress[`${type}_${category}`];
      if (savedIndex > 0) {
        setSavedProgress(savedIndex);
        setShowResumeModal(true);
      }
    }
  };

  const handleResume = () => {
    if (savedProgress && flatListRef.current) {
      setCurrentIndex(savedProgress);
      flatListRef.current.scrollToIndex({
        index: savedProgress,
        animated: true,
      });
    }
    setShowResumeModal(false);
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
    setShowResumeModal(false);
    // Clear saved progress
    if (global.questionProgress) {
      delete global.questionProgress[`${type}_${category}`];
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this question from ${category}:\n\n${questions[currentIndex]}`,
        title: `Spill It - ${category}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBack = () => {
    router.replace({
      pathname: "/",
      params: { theme: routeTheme || type },
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setCurrentIndex(newIndex);
  };

  const navigateToCard = (index) => {
    if (index >= 0 && index < questions.length && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      navigateToCard(currentIndex + 1);
    } else {
      // Handle completion
      handleBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigateToCard(currentIndex - 1);
    }
  };

  const renderItem = ({ item, index }) => {
    const scale = scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.92, 1, 0.92],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale }],
          opacity,
        }}
      >
        <View style={styles.cardContainer}>
          <QuestionCard question={item} />
        </View>
      </Animated.View>
    );
  };

  const getItemLayout = (_, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.textPrimary} />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  if (error && questions.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Something went wrong</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchQuestions}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ResumeModal
        visible={showResumeModal}
        savedProgress={savedProgress}
        totalQuestions={questions.length}
        onStartOver={handleStartOver}
        onResume={handleResume}
      />

      <QuestionHeader
        title={category}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onBackPress={handleBack}
        onSharePress={handleShare}
      />

      <View style={styles.contentContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(_, index) => `question-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          initialScrollIndex={currentIndex}
          getItemLayout={getItemLayout}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="center"
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>

      <PaginationDots
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />
      <NavigationButtons
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPreviousPress={handlePrevious}
        onNextPress={handleNext}
      />
    </SafeAreaView>
  );
}
