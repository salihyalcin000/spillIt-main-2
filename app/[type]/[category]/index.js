import React, { useState, useEffect } from "react";
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
const SWIPE_THRESHOLD = 0.15 * SCREEN_WIDTH;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

// Fallback questions if data loading fails
const FALLBACK_QUESTIONS = [
  "Oops, we couldn't load questions right now.",
  "Please check your internet connection and try again.",
  "You can always come back later!",
];

export default function QuestionScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme).questionScreen;

  const { type, category, theme: routeTheme } = useLocalSearchParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);

  // For animation
  const slideAnim = useState(new Animated.Value(0))[0];

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
        const loadedQuestions = jsonData[type].categoryDetails[category].questions;
        setQuestions(loadedQuestions);

        // Check for saved progress once data is loaded
        checkProgress();

        // If no saved progress and questions are loaded, ensure we're at the first question
        if (!global.questionProgress?.[`${type}_${category}`] && loadedQuestions.length > 0) {
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
    if (savedProgress) {
      setCurrentIndex(savedProgress);
    }
    setShowResumeModal(false);
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    setShowResumeModal(false);
    // Clear saved progress
    if (global.questionProgress) {
      delete global.questionProgress[`${type}_${category}`];
    }
  };

  const swipeCard = (direction) => {
    Animated.timing(slideAnim, {
      toValue: direction * SCREEN_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
      if (direction === 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (direction === -1 && currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 5,
    onPanResponderMove: (_, gestureState) => {
      slideAnim.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      const velocity = Math.abs(gesture.vx);
      if (
        gesture.dx > SWIPE_THRESHOLD ||
        (velocity > SWIPE_VELOCITY_THRESHOLD && gesture.dx > 0)
      ) {
        swipeCard(1);
      } else if (
        gesture.dx < -SWIPE_THRESHOLD ||
        (velocity > SWIPE_VELOCITY_THRESHOLD && gesture.dx < 0)
      ) {
        swipeCard(-1);
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          friction: 7,
          tension: 40,
        }).start();
      }
    },
  });

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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle completion
      handleBack();
    }
  };

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
        <QuestionCard
          question={questions[currentIndex]}
          panResponder={panResponder}
          slideAnim={slideAnim}
        />
      </View>

      <NavigationButtons
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPreviousPress={() => swipeCard(1)}
        onNextPress={handleNext}
      />

      <PaginationDots
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />
    </SafeAreaView>
  );
}
