const API_URL = "http://172.20.10.4:8000/api";
import axios from "axios";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (email, password, accountType) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      accountType,
    });

    if (response.status === 200) {
      console.log("User registered successfully:", response.data);
      return true;
    } else {
      console.error("Registration failed:", response.statusText);
      return false;
    }
  } catch (error) {
    Toast.error(error.response.data.message);
    return false;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      // console.log("User Loggedin successfully:", response.data);
      return true;
    } else {
      console.error("Registration failed:", response.statusText);
      return false;
    }
  } catch (error) {
    Toast.error(error.response.data.message);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.clear();
    console.log("UserData removed from AsyncStorage");

    const keys = await AsyncStorage.getAllKeys();
    console.log("Remaining keys in AsyncStorage:", keys);
  } catch (error) {
    console.error("Error removing UserData from AsyncStorage:", error);
  }
};

export const getUserToken = async () => {
  try {
    const userDataString = await AsyncStorage.getItem("userData");

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      let token = `Bearer ${userData.token}`;
      return token;
    } else {
      console.log("No user data found in AsyncStorage");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/user`, {
      headers: {
        Authorization: await getUserToken(),
      },
    });
    if (response.status === 200) {
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      // console.log("User info", response.data);
      return response.data;
    } else {
      console.error("Registration failed:", response.statusText);
      return false;
    }
  } catch (error) {
    Toast.error(error.response.data.message);
    return false;
  }
};
