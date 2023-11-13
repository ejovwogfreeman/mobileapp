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
} from "react-native";
import { CheckBox } from "react-native-elements";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Toast } from "toastify-react-native";

const ForgotPassword = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    if (!checked) {
      return Toast.error(
        "Please check the box to agree to the terms and conditions."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.accountContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color={colors.secondary} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.loginText}>BECOME A RIDER</Text>
          <View>
            <Text style={styles.info}>
              To become a rider, you need to upgrade your account. Start by
              clicking the button below, then proceed to the settings page to
              complete all the necessary details and upload a verification
              document. After that, you'll need to visit our office for physical
              registration.
            </Text>
          </View>
          <CheckBox
            title={checked ? "Agreed" : "Agree and continue"}
            checked={checked}
            onPress={toggleCheckbox}
            checkedColor="green"
            containerStyle={{
              marginLeft: 0,
              paddingLeft: 0,
              backgroundColor: "transparent",
              borderWidth: "none",
            }}
            titleProps={{ style: { color: "white", marginLeft: 10 } }}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>UPGRADE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: colors.opaque,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.primary,
    paddingTop: 5,
  },
  userInfo: {
    padding: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: colors.opaque,
    borderWidth: 1,
    backgroundColor: "rgba(256,256,256,0.05)",
    color: colors.secondary,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width - 40,
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
  info: {
    color: colors.secondary,
    textAlign: "justify",
  },
});

export default ForgotPassword;
