import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../components/Colors";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { useUser } from "../../../userContext";

const Payment = ({ navigation, route }) => {
  const { user } = useUser();

  const { totalPrice, price } = route.params;

  const handleOnRedirect = (data) => {
    console.log(data);
  };

  const generateTransactionRef = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  const paymetOption = {
    tx_ref: generateTransactionRef(10),
    authorization: "FLWPUBK_TEST-4081f49aaeb68ef6c3ef01d7fb52803d-X",
    customer: {
      email: user?.email,
      name: user?.fullName || user?.username,
    },
    amount: Number(price.toFixed(0)),
    currency: "NGN",
    payment_options: "card",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-left"
          size={40}
          color={colors.secondary}
          style={{ marginLeft: -15 }}
        />
      </TouchableOpacity>
      <View style={styles.priceCont}>
        <Text style={styles.priceText}>
          Dear{" "}
          <Text style={{ fontWeight: "bold", color: "#F8CC4F" }}>
            {user?.fullName || user?.username}
          </Text>
          , You are about to pay the sum of
        </Text>
        <Text style={styles.price}> NGN {totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.cash}>
        <Text style={styles.cashText}>Pay with cash</Text>
      </TouchableOpacity>
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={paymetOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: colors.opaque,
    backgroundColor: colors.primary,
    paddingTop: 5,
    padding: 20,
  },
  priceCont: {
    padding: 20,
    borderRadius: 5,
    marginTop: 170,
    marginBottom: 30,
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    color: colors.secondary,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    color: "#F8CC4F",
    fontSize: 25,
    fontWeight: "bold",
  },
  cash: {
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  cashText: {
    color: colors.secondary,
    fontSize: 18,
  },
});

export default Payment;
