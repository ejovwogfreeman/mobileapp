// LocationScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Toast } from "toastify-react-native";

const LocationScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isPickupSelected, setIsPickupSelected] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handlePickupSelect = (place, isOrigin) => {
    const { geometry, description } = place;
    const { location } = geometry;
    const selectedLocation = {
      latitude: location.lat,
      longitude: location.lng,
      description,
    };

    if (isOrigin) {
      setOrigin(selectedLocation);
    } else {
      setDestination(selectedLocation);
    }

    setIsPickupSelected(true);
    setIsFocus(false);
  };

  const handleDestinationSelect = (place, isOrigin) => {
    const { geometry, description } = place;
    const { location } = geometry;
    const selectedLocation = {
      latitude: location.lat,
      longitude: location.lng,
      description,
    };

    if (isOrigin) {
      setOrigin(selectedLocation);
    } else {
      setDestination(selectedLocation);
    }
  };

  const navigateToMap = () => {
    if (!origin || !destination || origin === "" || destination === "") {
      Toast.error("PLEASE SELECT ALL FIELDS");
    } else {
      navigation.navigate("MapScreen", { origin, destination });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-left"
          size={40}
          color={colors.secondary}
          style={{ marginLeft: -15 }}
        />
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        placeholder="Select Origin"
        onPress={(data, details = null) => handlePickupSelect(details, true)}
        query={{
          key: "AIzaSyAfbw26gYCXHuaE_LiEbVi_hqUsSBixAL8",
          language: "en",
          components: "country:ng",
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            width: "100%",
          },
          textInput: {
            color: "white",
            fontSize: 16,
            backgroundColor: "rgba(256,256,256,0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.5)",
          },
          poweredContainer: {
            display: "none",
          },
        }}
        textInputProps={{
          placeholderTextColor: "rgba(255,255,255,0.7)",
          onFocus: () => setIsFocus(true),
          onBlur: () => setIsFocus(false),
        }}
      />
      {isPickupSelected && !isFocus && (
        <GooglePlacesAutocomplete
          placeholder="Select Destination"
          onPress={(data, details = null) =>
            handleDestinationSelect(details, false)
          }
          query={{
            key: "AIzaSyAfbw26gYCXHuaE_LiEbVi_hqUsSBixAL8",
            language: "en",
            components: "country:ng",
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: "100%",
              marginTop: -290,
            },
            textInput: {
              color: "white",
              fontSize: 16,
              backgroundColor: "rgba(256,256,256,0.05)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
            },
            poweredContainer: {
              display: "none",
            },
          }}
          textInputProps={{
            placeholderTextColor: "rgba(255,255,255,0.7)",
          }}
        />
      )}
      <TouchableOpacity style={styles.ride} onPress={navigateToMap}>
        <Text style={styles.rideText}>START RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: colors.opaque,
    backgroundColor: colors.primary,
    paddingTop: 5,
    padding: 20,
  },
  ride: {
    backgroundColor: colors.blue,
    color: colors.secondary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  rideText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LocationScreen;
