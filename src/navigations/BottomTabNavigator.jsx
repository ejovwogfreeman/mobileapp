import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/home/ServiceScreen";
import ActivityScreen from "../screens/home/ActivityScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../components/Colors";
import { StyleSheet } from "react-native";
import AccountNavigator from "./AccountNavigator";
import HomeNavigator from "./HomeNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      style={styles.tabStyle}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          paddingTop: 10,
          borderTopColor: colors.opaque,
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.opaque,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Service") {
            iconName = "apps";
          } else if (route.name === "Activity") {
            iconName = "fact-check";
          } else if (route.name === "Account") {
            iconName = "person";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.primary,
            paddingTop: 10,
            borderTopColor: colors.opaque,
            borderTopWidth: 2,
          },
        })}
      />
      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.primary,
            paddingTop: 10,
            borderTopColor: colors.opaque,
            borderTopWidth: 2,
          },
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName === "SettingsNav" ||
    routeName === "Messages" ||
    routeName === "LocationScreen" ||
    routeName === "MapScreen" ||
    routeName === "PaymentScreen" ||
    routeName === "ChatScreen" ||
    routeName === "EarnScreen" ||
    routeName === "LegalScreen" ||
    routeName === "ChooseRider"
  ) {
    return "none";
  }

  return "flex";
};

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: colors.primary,
  },
});

export default BottomTabNavigator;
