import { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, Animated } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-reanimated";
import { Share } from "react-native";
import { SOCIAL_LINKS } from "../constants/links";
import CategoryCard from "../components/CategoryCard";
import HelpModal from "../components/HelpModal";
import SettingsModal from "../components/SettingsModal";
import ThemeSelector from "../components/ThemeSelector";
import Header from "../components/Header";
import TransitionBackground from "../components/TransitionBackground";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useTheme } from "../styles/theme/ThemeContext";
import createStyles from "../styles/appStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;

import SubscriptionModal from "../components/SubscriptionModal";
import useSubscriptionStore from "../store/useSubscriptionStore";

// Add a fallback data structure in case the fetch fails
const FALLBACK_DATA = {
  Fun: {
    categories: ["General", "Entertainment", "Sports"],
    categoryDetails: {
      General: {
        description: "General fun questions",
        emoji: "🎮",
        questions: [
          "What's your favorite color?",
          "What hobby would you take up if time and money weren't an issue?",
        ],
      },
      Entertainment: {
        description: "Movies, music, and more",
        emoji: "🎬",
        questions: [
          "What's the last movie you watched?",
          "What's your favorite song?",
        ],
      },
      Sports: {
        description: "All about sports",
        emoji: "⚽",
        questions: [
          "What's your favorite sport?",
          "Do you have a favorite team?",
        ],
      },
    },
  },
  Deep: {
    categories: ["Personal", "Philosophical"],
    categoryDetails: {
      Personal: {
        description: "Get to know yourself",
        emoji: "🧠",
        questions: ["What are you most proud of?", "What's your biggest fear?"],
      },
      Philosophical: {
        description: "Think deeply",
        emoji: "💭",
        questions: [
          "Do you believe in fate?",
          "What is the meaning of life for you?",
        ],
      },
    },
  },
  Romantic: {
    categories: ["Dating", "Relationships"],
    categoryDetails: {
      Dating: {
        description: "For date night",
        emoji: "❤️",
        questions: [
          "What was your first impression of me?",
          "What's your love language?",
        ],
      },
      Relationships: {
        description: "Strengthen your bond",
        emoji: "💖",
        questions: [
          "What's your favorite memory of us?",
          "What do you think makes a relationship successful?",
        ],
      },
    },
  },
};

export default function Home() {
  const { theme } = useTheme(); // Get current theme from context
  const styles = createStyles(theme); // Generate styles based on current theme

  const { theme: routeTheme } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter();
  const isSubscribed = useSubscriptionStore((state) => state.isSubscribed);
  const fetchOfferings = useSubscriptionStore((state) => state.fetchOfferings);
  const checkSubscription = useSubscriptionStore((state) => state.checkSubscription);

  // Fetch data from GitHub
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Replace this URL with your actual GitHub raw content URL
        const response = await fetch(
          "https://raw.githubusercontent.com/whoroopamgupta/questions.json/main/questions.json"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData);

        // Extract types from the fetched data
        const dataTypes = Object.keys(jsonData);
        setTypes(dataTypes);

        // Set initial selected type
        const initialType =
          routeTheme && dataTypes.includes(routeTheme)
            ? routeTheme
            : dataTypes[0];
        setSelectedType(initialType);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);

        // Use fallback data if fetch fails
        setData(FALLBACK_DATA);
        const fallbackTypes = Object.keys(FALLBACK_DATA);
        setTypes(fallbackTypes);
        setSelectedType(
          routeTheme && fallbackTypes.includes(routeTheme)
            ? routeTheme
            : fallbackTypes[0]
        );

        setIsLoading(false);
      }
    };

    fetchData();
    fetchOfferings();
    checkSubscription(); // Check subscription status on app start
  }, []);

  // Update selected type when theme param changes
  useEffect(() => {
    if (routeTheme && types.includes(routeTheme)) {
      setSelectedType(routeTheme);
    }
  }, [routeTheme, types]);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(!isSubscribed);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Update subscription modal visibility when subscription status changes
  useEffect(() => {
    setShowSubscriptionModal(!isSubscribed);
  }, [isSubscribed]);

  // Periodically check subscription status
  useEffect(() => {
    const interval = setInterval(() => {
      checkSubscription();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleCloseSubscriptionModal = async () => {
    const isActive = await checkSubscription();
    console.log("Subscription status after check:", isActive);
    setShowSubscriptionModal(!isActive);
  };

  const handleTypeChange = (newType) => {
    if (newType === selectedType || isAnimating) return;

    const currentIndex = types.indexOf(selectedType);
    const newIndex = types.indexOf(newType);
    const direction = currentIndex < newIndex ? 1 : -1;

    setIsAnimating(true);
    setIsTransitioning(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 75,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(slideAnim, {
        toValue: -direction * SCREEN_WIDTH,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setSelectedType(newType);
        slideAnim.setValue(0);

        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            setIsAnimating(false);
            setIsTransitioning(false);
          });
        }, 100);
      });
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out Spill It - The ultimate conversation starter app!",
        title: "Spill It",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCategoryCard = ({ item, index }) => {
    if (!data || !selectedType) return null;

    const categoryData = data[selectedType].categoryDetails[item];
    return (
      <CategoryCard
        item={{ name: item, categoryData }}
        index={index}
        theme={selectedType}
        onPress={() => {
          if (index != 0 && !isSubscribed) {
            setShowSubscriptionModal(true);
            return;
          }
          router.push({
            pathname: `/${selectedType}/${item}`,
            params: { theme: selectedType },
          });
        }}
        styles={styles}
      />
    );
  };

  const renderContent = (type) => {
    if (!data || !type || !data[type]) return null;

    return (
      <FlatList
        data={data[type].categories}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => renderCategoryCard({ item, index })}
        contentContainerStyle={styles.categories}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    );
  };

  // Loading and error states
  if (isLoading) {
    return <LoadingState styles={styles} />;
  }

  if (error && !data) {
    return (
      <ErrorState
        error={error}
        onRetry={() => window.location.reload()}
        styles={styles}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          onHelpPress={() => setShowHelpModal(true)}
          onSettingsPress={() => setShowSettingsModal(true)}
          styles={styles}
        />

        <View style={styles.contentContainer}>
          {isTransitioning && <TransitionBackground styles={styles} />}
          <Animated.View
            style={[
              styles.animatedContent,
              {
                transform: [{ translateX: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            {renderContent(selectedType)}
          </Animated.View>
        </View>
        <ThemeSelector
          types={types}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          styles={styles}
        />
      </View>

      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        styles={styles}
      />

      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onShare={handleShare}
        socialLinks={SOCIAL_LINKS}
        styles={styles}
      />

      <SubscriptionModal
        visible={showSubscriptionModal}
        onCloseResumeModal={handleCloseSubscriptionModal}
      />
    </SafeAreaView>
  );
}
