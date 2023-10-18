import React from "react";
import { colors } from "../../components/Colors";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.accountContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>Login Screen</Text>
        <View style={styles.text}>
          <Text>New Here?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    padding: 20,
  },
  text: {
    flexDirection: "row",
  },
});

export default LoginScreen;
