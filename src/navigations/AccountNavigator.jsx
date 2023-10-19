import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/home/AccountScreen";
import FamilyScreen from "../screens/account/FamilyScreen";
import SettingScreen from "../screens/account/SettingScreen";
import MessageScreen from "../screens/account/MessageScreen";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Account" mode="modal" headerMode="none">
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Family"
        component={FamilyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
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
