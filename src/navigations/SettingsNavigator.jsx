import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/account/SettingsScreen";
import AddHome from "../screens/settings/AddHome";
import AddWork from "../screens/settings/AddWork";
import ChangePassword from "../screens/settings/ChangePassword";
import UpdateProfile from "../screens/settings/UpdateProfile";
import AddProfilePic from "../screens/settings/AddProfilePic";
import AddDocument from "../screens/settings/AddDocument";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsSreen"
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProfilePic"
        component={AddProfilePic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddHome"
        component={AddHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddWork"
        component={AddWork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocument}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
