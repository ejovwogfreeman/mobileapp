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
  Button,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const AddDocument = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.assets[0]?.uri });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.accountContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color={colors.secondary} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.loginText}>ADD VERIFICATION DOCUMENT</Text>
          <Text style={styles.label}>Document Type</Text>
          <TextInput
            placeholderTextColor={colors.opaque}
            style={styles.input}
            placeholder="Document Type"
          />
          <Button
            title="Please select an image"
            onPress={openImagePickerAsync}
          />
          {selectedImage !== null && (
            <Image
              source={{ uri: selectedImage.localUri }}
              style={{
                width: "100%",
                objectFit: "cover",
                height: 200,
                marginTop: 10,
                marginBottom: 20,
              }}
            />
          )}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>UPLOAD</Text>
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
});

export default AddDocument;
