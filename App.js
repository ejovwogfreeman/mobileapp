// import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import { colors } from "./src/components/Colors";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./src/navigations/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AuthNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // backgroundColor: "red",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
