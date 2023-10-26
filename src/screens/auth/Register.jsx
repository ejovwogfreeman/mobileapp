import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import CustomModal from "../../components/CustomModal";

const RegisterScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Handle login logic here
  };
  const [selectedValue, setSelectedValue] = useState("Select Account Type");

  const handlePickerPress = () => {
    setModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

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
            <Text style={styles.label}>Account Type</Text>
            <TouchableOpacity
              onPress={handlePickerPress}
              style={styles.pickerText}
            >
              <Text style={styles.pick}>{selectedValue}</Text>
              <Icon name="chevron-down" size={20} color={colors.secondary} />
            </TouchableOpacity>
            {modalVisible && (
              <CustomModal
                selectedValue={selectedValue}
                onClose={(value) => {
                  setModalVisible(false);
                  setSelectedValue(value);
                }}
              />
            )}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputbox}>
              <Icon
                name="envelope"
                size={20}
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
            <Text style={styles.label}>Confirm Password</Text>
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
              <Text style={styles.loginButtonText}>REGISTER</Text>
            </TouchableOpacity>
            <View style={styles.newSec}>
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.registerButtonText}>Login</Text>
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
  pickerText: {
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "rgba(256,256,256,0.05)",
    color: colors.secondary,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 40,
  },
  pick: { color: colors.secondary, fontSize: 18 },
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
  text: {
    fontSize: 16,
    color: colors.secondary,
  },
  registerButtonText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
