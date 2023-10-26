import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ServiceScreen from "../screens/home/ServiceScreen";
import ActivityScreen from "../screens/home/ActivityScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../components/Colors";
import { StyleSheet } from "react-native";
import AccountNavigator from "./AccountNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      style={styles.tabStyle}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          paddingTop: 10,
          borderTopColor: colors.opaque,
          borderTopWidth: 5,
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
        options={{ headerShown: false }}
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
            borderTopWidth: 5,
          },
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName === "Family" ||
    routeName === "Settings" ||
    routeName === "Messages"
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
