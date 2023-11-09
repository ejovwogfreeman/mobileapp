import React from "react";
import { colors } from "../../components/Colors";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Toastify from "../../components/Toastify";
import { Toast } from "toastify-react-native";

const ActivityScreen = () => {
  const showToasts = () => {
    Toast.success("Promised is resolved and i am a toast component");
  };

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.bigText}>Activities</Text>
      <Text style={styles.smallText}>You don't have any recent activity</Text>
      <TouchableOpacity
        onPress={showToasts}
        style={{ backgroundColor: "blue", padding: 10, width: 100 }}
      >
        <Text style={{ color: "white" }}>Show Toast</Text>
      </TouchableOpacity>
      <Toastify />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    padding: 20,
    backgroundColor: colors.primary,
    flex: 1,
  },
  bigText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ActivityScreen;
