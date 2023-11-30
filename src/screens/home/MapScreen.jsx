///omj
// // AIzaSyAfbw26gYCXHuaE_LiEbVi_hqUsSBixAL8

// uche
// AIzaSyCzZeDcEfwCdXSoameCC6SqZeJdrYooDp8

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../components/Colors";
import axios from "axios";

const MapScreen = ({ navigation, route }) => {
  const { origin, destination } = route.params;
  const [arrowPosition, setArrowPosition] = useState(origin);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // console.log("origin", origin.formatted_address);
  // console.log("destination", destination.formatted_address);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the next position along the route
      const nextPosition = getNextPosition(arrowPosition, destination);

      // Update the arrow's position
      setArrowPosition(nextPosition);
    }, 500); // Update every half second (adjust as needed for speed)

    return () => clearInterval(intervalId);
  }, [arrowPosition, destination]);

  useEffect(() => {
    // Calculate route coordinates
    const coordinates = [
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude },
    ];
    setRouteCoordinates(coordinates);
  }, [origin, destination]);

  const getNextPosition = (currentPosition, destination) => {
    // For simplicity, use a constant speed for the entire route
    const speed = 0.0005; // Adjust the speed as needed
    const deltaX = destination.longitude - currentPosition.longitude;
    const deltaY = destination.latitude - currentPosition.latitude;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const ratio = speed / distance;

    const nextLongitude = currentPosition.longitude + ratio * deltaX;
    const nextLatitude = currentPosition.latitude + ratio * deltaY;

    return { latitude: nextLatitude, longitude: nextLongitude };
  };

  const locations = [origin, destination].filter(
    (location) => location !== null
  );

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const amountPerKilometer = 200;

  useEffect(() => {
    // Fetch distance and duration information from Google Maps Directions API
    const getDirections = async () => {
      try {
        const apiKey = "AIzaSyAfbw26gYCXHuaE_LiEbVi_hqUsSBixAL8";
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`
        );

        const route = response.data.routes[0];
        if (route) {
          setDistance(route.legs[0].distance.value / 1000); // Convert meters to kilometers
          setDuration(route.legs[0].duration.value / 60); // Convert seconds to minutes
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    getDirections();
  }, [origin, destination]);

  const price = distance * amountPerKilometer;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && hours <= 1) {
      return `${hours} HR ${remainingMinutes} MINS`;
    } else if (hours > 1) {
      return `${hours} HRS ${remainingMinutes} MINS`;
    } else {
      return `${remainingMinutes} MINS`;
    }
  };

  const formatPriceWithCommas = (price) => {
    return Number(price).toLocaleString(undefined, { useGrouping: true });
  };

  const totalPrice = formatPriceWithCommas(price.toFixed(0));

  const tableData = [
    { text: "DISTANCE", info: `${distance.toFixed(2)} KM` },
    { text: "TIME", info: formatTime(duration.toFixed(0)) },
    {
      text: "PRICE",
      info: `NGN ${totalPrice}`,
    },
  ];

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "65%" }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
          customMapStyle={darkMapStyle}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={index === 0 ? "Origin" : "Destination"}
              pinColor={index === 0 ? "blue" : "red"}
            />
          ))}
          {origin && destination && (
            <Marker
              coordinate={{
                latitude: arrowPosition.latitude,
                longitude: arrowPosition.longitude,
              }}
              title="Arrow"
              pinColor="green"
            />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={2}
              strokeColor="red"
            />
          )}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey="AIzaSyAfbw26gYCXHuaE_LiEbVi_hqUsSBixAL8"
              strokeWidth={2}
              strokeColor="blue"
            />
          )}
        </MapView>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.bottomHeading}>
          <Text style={styles.bottomHeadingText}>Start Your Journey</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <View>
              {/* <Icon name="motorcycle" size={120} color="white" /> */}
              <Image
                source={require("../../../assets/bikeicon.png")}
                style={{ width: 100, height: 85, tintColor: "white" }}
              />
            </View>
            <View style={styles.table}>
              {tableData.map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.cell}>{item.text}</Text>
                  <Text style={styles.cell}>{item.info}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.choose}
            onPress={() =>
              navigation.navigate("PaymentScreen", { totalPrice, price })
            }
          >
            <View style={styles.chooseTextCont}>
              <Icon
                name="credit-card"
                size={40}
                color="white"
                style={{ marginLeft: -10 }}
              />
              <Text style={styles.chooseText}>CHOOSE PAYMENT METHOD</Text>
            </View>
            <Icon
              name="chevron-right"
              size={40}
              color="white"
              style={{ marginRight: -12 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ride}
            onPress={() => navigation.navigate("ChooseRider")}
          >
            <Text style={styles.rideText}>START RIDE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: "rgba(255,255,255,0.3)",
    backgroundColor: colors.primary,
  },
  map: {
    flex: 1,
    width: "100%",
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
  distanceContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 1,
  },
  distanceText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 350,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 5,
    borderTopColor: "rgba(255,255,255,0.3)",
  },
  bottomHeading: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
    justifyContentL: "center",
    alignItems: "center",
  },
  bottomHeadingText: {
    color: colors.secondary,
    fontSize: 18,
  },
  info: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  table: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  cell: {
    flex: 1,
    padding: 10,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
  },
  choose: {
    color: colors.secondary,
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  chooseTextCont: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  chooseText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
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

export default MapScreen;
