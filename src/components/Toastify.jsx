import React from "react";
import ToastManager from "toastify-react-native";

const Toastify = () => {
  return (
    <ToastManager
      style={{
        marginTop: -50,
        height: 100,
        width: "100%",
        flexWrap: "wrap",
      }}
    />
  );
};

export default Toastify;
