import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import Searchbar from "../../components/Searchbar";
import { colors } from "../../components/Colors";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Slider from "../../components/Slider";
import Services from "../../components/Services";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../../../userContext";

const HomeScreen = ({ navigation }) => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <ImageBackground
            source={require("../../../assets/background.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
              <Searchbar />
            </TouchableOpacity>
            <Header navigation={navigation} />
          </ImageBackground>
        </View>
        <Slider />
        {/* {user.email} */}
        <Carousel />
        <Services />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topContainer: {
    height: 320,
    borderColor: colors.secondary,
    borderBottomRightRadius: 100,
    backgroundColor: colors.primary,
    overflow: "hidden",
    zIndex: 1,
  },
});

export default HomeScreen;
