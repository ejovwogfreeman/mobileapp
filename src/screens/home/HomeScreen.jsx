import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Searchbar from "../../components/Searchbar";
import { colors } from "../../components/Colors";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Slider from "../../components/Slider";
import Services from "../../components/Services";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Searchbar />
        <Header />
        <Slider />
        <Carousel />
        <Services />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: 320,
    borderColor: colors.secondary,
    borderBottomRightRadius: 100,
    backgroundColor: colors.primary,
    zIndex: 1,
  },
});

export default HomeScreen;
