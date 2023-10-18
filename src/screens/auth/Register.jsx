import React from "react";
import { colors } from "../../components/Colors";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.accountContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>Register Screen</Text>
        <View style={styles.text}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Login</Text>
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

export default RegisterScreen;
