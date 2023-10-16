import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "./Colors";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.text}>
          <Text style={styles.text1}>Want Better Pickups?</Text>
          <Text style={styles.text2}>Worry No More...</Text>
          <View style={styles.seeMore}>
            <Text style={styles.text3}>Share Locations</Text>
            <Icon name="east" size={20} color={colors.black} />
          </View>
        </View>
        <Image
          source={require("../../assets/dispatch.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 230,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 150,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  seeMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    width: 150,
    padding: 10,
    borderRadius: 5,
  },
  text1: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text2: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 30,
  },
  text3: {
    color: colors.black,
  },
});

export default Header;
