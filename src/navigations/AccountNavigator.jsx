import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/home/AccountScreen";
import MessageScreen from "../screens/account/MessageScreen";
import SettingsNavigator from "./SettingsNavigator";

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
    </Stack.Navigator>
  );
};

export default AccountNavigator;
