import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Searchbar from "../../components/Searchbar";
import { colors } from "../../components/Colors";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Slider from "../../components/Slider";
import Services from "../../components/Services";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
            <Searchbar />
          </TouchableOpacity>
          <Header navigation={navigation} />
          <Slider />
          <Carousel />
          <Services />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
