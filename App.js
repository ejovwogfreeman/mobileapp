import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
} from "react-native";
import Taskbar from "./src/components/Taskbar";
import { colors } from "./src/components/Colors";
import HomeScreen from "./src/screens/HomeScreen";
import ServiceScreen from "./src/screens/ServiceScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import AccountScreen from "./src/screens/AccountScreen";

export default function App() {
  const navigateToScreen = (screenName) => {
    setActiveScreen(screenName);
  };
  const [activeScreen, setActiveScreen] = useState("HomeScreen");

  const renderScreen = () => {
    switch (activeScreen) {
      case "HomeScreen":
        return <HomeScreen />;
      case "ServiceScreen":
        return <ServiceScreen />;
      case "ActivityScreen":
        return <ActivityScreen />;
      case "AccountScreen":
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderScreen()}
      </ScrollView>
      <Taskbar navigation={{ navigate: navigateToScreen }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
