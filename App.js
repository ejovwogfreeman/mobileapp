import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import { colors } from "./src/components/Colors";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./src/navigations/AuthNavigator";

import Toastify from "./src/components/Toastify";

import { UserProvider } from "./userContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Toastify />
          <AuthNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
