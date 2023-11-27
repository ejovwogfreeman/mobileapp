import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser, logoutUser, getUserToken, loginUser } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const checkLoginStatus = async () => {
  //       if (await getUserToken()) {
  //         const userInfo = await getUser();
  //         setUser(userInfo);
  //         await AsyncStorage.setItem("userData", JSON.stringify(userInfo));
  //       } else {
  //         console.log("No user");
  //       }
  //     };

  //     checkLoginStatus();
  //   }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("locationPermissionStatus");
    setUser(null);
    await logoutUser();
  };

  const handleLogin = async (email, password) => {
    const loginSuccess = await loginUser(email, password);

    if (loginSuccess) {
      const userInfo = await getUser();
      setUser(userInfo);
      await AsyncStorage.setItem("userData", JSON.stringify(userInfo));
    }

    return loginSuccess;
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, logout: handleLogout, login: handleLogin }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
