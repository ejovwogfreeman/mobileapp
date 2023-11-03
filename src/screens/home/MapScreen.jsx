import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import MapStyle from "./MapStyle.json";

const MapScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleOriginSelect = (data, details) => {
    setOrigin({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleDestinationSelect = (data, details) => {
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.accountContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={40} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        <View style={{ height: keyboardOpen ? "50%" : "70%" }}>
          <MapView
            style={{ height: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={MapStyle}
          >
            {origin && (
              <Marker
                coordinate={origin}
                title="Origin"
                description="Origin Description"
                pinColor="green"
              />
            )}

            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
                description="Destination Description"
                pinColor="red"
              />
            )}

            {origin && destination && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={"YOUR_GOOGLE_API_KEY"}
                strokeWidth={3}
                strokeColor="blue"
              />
            )}
          </MapView>
        </View>
        <View
          style={{
            ...styles.autocompleteContainer,
            height: keyboardOpen ? "42%" : "30%",
          }}
        >
          <View>
            <Text style={styles.text}>FROM</Text>
            <GooglePlacesAutocomplete
              placeholder="Enter Pickup Location"
              onPress={handleOriginSelect}
              query={{
                key: "YOUR_GOOGLE_API_KEY",
                language: "en",
              }}
              styles={{
                textInput: {
                  color: colors.secondary,
                  fontSize: 16,
                  backgroundColor: "rgba(256,256,256,0.05)",
                  borderWidth: 1,
                  borderColor: colors.opaque,
                },
              }}
              textInputProps={{
                placeholderTextColor: colors.opaque,
              }}
            />
          </View>
          <View>
            <Text style={styles.text}>TO</Text>
            <GooglePlacesAutocomplete
              placeholder="Enter Delivery Location"
              onPress={handleDestinationSelect}
              query={{
                key: "YOUR_GOOGLE_API_KEY",
                language: "en",
              }}
              styles={{
                textInput: {
                  color: colors.secondary,
                  fontSize: 16,
                  backgroundColor: "rgba(256,256,256,0.05)",
                  borderWidth: 1,
                  borderColor: colors.opaque,
                },
              }}
              textInputProps={{
                placeholderTextColor: colors.opaque,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => navigation.navigate("Activity")}
          >
            <Text style={styles.confirmButtonText}>CONFIRM PICKUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: colors.opaque,
    backgroundColor: colors.primary,
  },
  iconContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: 45,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  autocompleteContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  text: {
    color: colors.secondary,
    marginBottom: 3,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default MapScreen;
