import React from "react";
import { colors } from "../../components/Colors";
import { View, Text, StyleSheet } from "react-native";
import Services from "../../components/Services";

const ServiceScreen = () => {
  return (
    <View style={styles.serviceContainer}>
      <View style={styles.services}>
        <Text style={styles.bigText}>Services</Text>
        <Text style={styles.smallText}>Our Services Includes</Text>
      </View>
      <Services />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer: {
    padding: 0,
    backgroundColor: colors.primary,
    flex: 1,
  },
  services: {
    padding: 20,
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

export default ServiceScreen;
