import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.accountContainer}>
          <View style={styles.userInfo}>
            <View style={styles.imagebox}>
              <Image
                source={require("../../../assets/logo.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputbox}>
              <Icon
                name="mail"
                size={24}
                style={styles.searchIcon}
                color={colors.secondary}
              />
              <TextInput
                placeholderTextColor={colors.opaque}
                style={styles.input}
                placeholder="Email"
              />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputbox}>
              <Icon
                name="lock"
                size={24}
                style={styles.searchIcon}
                color={colors.secondary}
              />
              <TextInput
                placeholderTextColor={colors.opaque}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.newSec}>
              <Text style={styles.text}>New here?</Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  imagebox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 210,
    height: 45,
  },
  userInfo: {
    padding: 20,
    paddingTop: 100,
  },
  label: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputbox: {
    borderWidth: 1,
    borderColor: colors.opaque,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgba(256,256,256,0.05)",
    width: Dimensions.get("window").width - 40,
  },
  input: {
    height: 40,
    color: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  loginButton: {
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  registerButton: {
    alignItems: "center",
    borderColor: colors.secondary,
  },
  newSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: colors.secondary,
    marginRight: 10,
  },
  registerButtonText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
