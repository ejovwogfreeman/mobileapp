import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/home/AccountScreen";
import MessageScreen from "../screens/account/MessageScreen";
import ChatScreen from "../screens/account/ChatScreen";
import SettingsNavigator from "./SettingsNavigator";
import EarnScreen from "../screens/home/EarnScreen";
import LegalScreen from "../screens/home/LegalScreen";
import TripScreen from "../screens/home/TripScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountScreen"
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsNav"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EarnScreen"
        component={EarnScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TripScreen"
        component={TripScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegalScreen"
        component={LegalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
