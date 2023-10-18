import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "./Colors";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Pickup location"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Icon name="search" size={24} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
    borderRadius: "50%",
  },

  input: {
    flex: 1,
    fontWeight: "bold",
    color: colors.tertiary,
  },
  searchIcon: {
    color: colors.tertiary,
  },
});

export default Searchbar;
