import React from "react";
import { colors } from "../../components/Colors";
import { View, Text, StyleSheet } from "react-native";

const ActivityScreen = () => {
  return (
    <View style={styles.activityContainer}>
      <Text style={styles.bigText}>Activities</Text>
      <Text style={styles.smallText}>You don't have any recent activity</Text>
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
