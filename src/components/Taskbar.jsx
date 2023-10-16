import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "./Colors";

const Taskbar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("HomeScreen");

  const handleTabPress = (tab) => {
    navigation.navigate(tab);
    setActiveTab(tab);
  };

  const renderTab = (iconName, tabName, tab) => (
    <TouchableOpacity
      style={styles.iconbox}
      onPress={() => handleTabPress(tab)}
    >
      <Icon
        name={iconName}
        size={30}
        color={activeTab === tab ? colors.white : colors.tertiary}
      />
      <Text
        style={[
          styles.text,
          { color: activeTab === tab ? colors.white : colors.tertiary },
        ]}
      >
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.taskbar}>
      {renderTab("home", "Home", "HomeScreen")}
      {renderTab("apps", "Service", "ServiceScreen")}
      {renderTab("fact-check", "Activity", "ActivityScreen")}
      {renderTab("person", "Account", "AccountScreen")}
    </View>
  );
};

const styles = StyleSheet.create({
  taskbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: colors.black,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopWidth: 3,
    borderColor: colors.tertiary,
  },
  iconbox: {
    alignItems: "center",
  },
  text: {
    fontSize: 12, // Set your desired font size
  },
});

export default Taskbar;
