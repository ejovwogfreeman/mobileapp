import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Services = () => {
  return (
    <View style={styles.serviceContainer}>
      <Image
        source={require("../../assets/dispatch2.jpg")}
        style={styles.imageLeft}
      />
      <Image
        source={require("../../assets/truck2.jpg")}
        style={styles.imageRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  imageLeft: {
    flex: 1,
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
    marginRight: 5,
  },
  imageRight: {
    flex: 1,
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
    marginLeft: 5,
  },
});

export default Services;
