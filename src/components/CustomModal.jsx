import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CustomModal = ({ onClose }) => {
  const handleClose = (value) => {
    onClose(value); // Call the onClose callback with the selected value
  };
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Account Type</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleClose("USER")}
          >
            <Text>USER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleClose("RIDER")}
          >
            <Text>RIDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});

export default CustomModal;
