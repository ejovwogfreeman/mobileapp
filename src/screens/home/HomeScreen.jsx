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
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  const { user } = useUser();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return null;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    // Fetch the current location immediately after a successful login
    if (user) {
      fetchCurrentLocation();
    }
  }, [user]); // Run the effect whenever the login status changes

  // console.log("currentLocation", currentLocation);

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
            <TouchableOpacity
              onPress={() => navigation.navigate("LocationScreen")}
            >
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
