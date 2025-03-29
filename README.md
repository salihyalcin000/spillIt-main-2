# SpillIt - React Native App (Expo)

This project is a **React Native (Expo)** app inspired by the Flamingo Cards concept, designed to present engaging question cards across various categories and types.

## 🌟 App Overview

SpillIt is an interactive card-based app with the following flow and structure:

---

## 🚀 App Flow

1. **Splash Screen**

   - Displays the app logo on launch.
   - Lasts for approximately **3 seconds** while the app loads in the background.
   - Automatically transitions to the main content.

2. **Home Screen**
   - Contains **3 navigation tabs** representing **3 different types** of question packs.
   - Each type shows **5 categories** of questions as buttons or cards.

---

## 🧭 Navigation Structure

- **Bottom Tabs** or **Top Tabs** (for 3 types):

  - Type 1
  - Type 2
  - Type 3

- Each Type → Displays **5 Categories**.

---

## 🏠 Home Screen Header

```
| Select a Pack (left) | [Button1] [Button2] (right) |
```

---

## 📂 Category Screen (after clicking a category)

- Displays **35 questions** from the selected category.
- Cards allow **swiping left and right** for navigation.
- **Back** and **Next** buttons at the bottom for manual navigation.

#### Card Layout Example:

```
-----------------------------------
|        [ Back Button ]          |
| Category Name      [ Share ]    |
-----------------------------------
|                                 |
|           QUESTION              |
|                                 |
|                                 |
|       Swipe Left / Right        |
|                                 |
|            SpillIt              |
|       (bottom right corner)     |
-----------------------------------
| [ Back ]              [ Next ]  |
-----------------------------------
```

---

## 🧩 Features

- **Splash Screen:** Logo display for 3 seconds.
- **Tab Navigation:** To switch between 3 question types.
- **Category Listing:** 5 categories per type.
- **Card Swipe Navigation:** Swipe through 35 questions per category.
- **Manual Navigation:** Back and Next buttons.
- **Share Button:** Share the current question.
- **Back Navigation:** To return to the previous screen.

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **React Navigation**
  - Tab Navigation
  - Stack Navigation
- **Gesture Handler** (for swipe)
- **React Native Share** (for sharing questions)
- **AsyncStorage (optional)** (to track progress, if needed)

---

## 💡 Notes for IDEs (Cursor, Copilot, etc.)

- Prioritize reusable components for:
  - **Question Card**
  - **Header**
  - **Category List**
- Implement smooth swipe gestures (like `react-native-gesture-handler` or `react-native-swipe-cards`).
- Maintain the navigation state between categories and questions.
- Use **static JSON** or local data for category questions (35 questions per category).

---

## 📂 Project Structure (suggested)

```
/assets
/components
  /Card
  /Header
  /CategoryList
/navigation
/screens
  /SplashScreen
  /HomeScreen
  /CategoryScreen
/utils
App.js
README.md
```

---

## ✅ To-Do

- [ ] Setup Splash Screen.
- [ ] Implement Tab Navigation.
- [ ] Design Home Screen with 5 categories per type.
- [ ] Create Card component with swipe functionality.
- [ ] Add share functionality.
- [ ] Polish UI and animations.

---

## 🎨 Design Inspiration

- Clean, minimal UI.
- Soft shadows, rounded corners.
- Engaging swipe animations.
- Use of the "SpillIt" logo and branding.

---
