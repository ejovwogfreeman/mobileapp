import React from "react";
import { colors } from "../../components/Colors";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useUser } from "../../../userContext";

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.accountContainer}
    >
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.username}>@{user && user.username}</Text>
          <Text style={styles.email}>{user && user.email}</Text>
        </View>
        <Image
          source={require("../../../assets/defaultprofile.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.iconbox}>
          <Icon name="help" size={30} color={colors.secondary} />
          <Text style={styles.text}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconbox2}>
          <Icon
            name="account-balance-wallet"
            size={30}
            color={colors.secondary}
          />
          <Text style={styles.text}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconbox}>
          <Icon name="fact-check" size={30} color={colors.secondary} />
          <Text style={styles.text}>Activity</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.timebox}>
        <Text style={styles.text}>Joined on:</Text>
        <Text style={styles.text}>
          {new Date().toDateString() + " | " + new Date().toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => navigation.navigate("SettingsNav")}
        >
          <Icon name="settings" size={30} color={colors.secondary} />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => navigation.navigate("Messages")}
        >
          <Icon name="message" size={30} color={colors.secondary} />
          <Text style={styles.actionText}>Messages</Text>
        </TouchableOpacity>
        {user && user.accountType !== "rider" && (
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => navigation.navigate("EarnScreen")}
          >
            <Icon name="delivery-dining" size={30} color={colors.secondary} />
            <Text style={styles.actionText}>Earn by Delivering</Text>
          </TouchableOpacity>
        )}
        {user && user.accountType === "rider" && (
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => navigation.navigate("TripScreen")}
          >
            <Icon name="delivery-dining" size={30} color={colors.secondary} />
            <Text style={styles.actionText}>View Trips</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => navigation.navigate("LegalScreen")}
        >
          <Icon name="policy" size={30} color={colors.secondary} />
          <Text style={styles.actionText}>Legal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={handleLogout}>
          <Icon name="logout" size={30} color={colors.secondary} />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    padding: 20,
    backgroundColor: colors.primary,
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  email: {
    fontSize: 20,
    color: colors.white,
    // fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  text: {
    color: colors.secondary,
    marginTop: 5,
    fontSize: 18,
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  iconbox: {
    backgroundColor: colors.opaque,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  iconbox2: {
    backgroundColor: colors.opaque,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  timebox: {
    backgroundColor: colors.opaque,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  action: {
    marginTop: 10,
    backgroundColor: "rgba(256, 256, 256, 0.05)",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 30,
  },
  actionIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "rgba(256, 256, 256, 0.05)",
  },
  actionText: {
    color: colors.secondary,
    marginLeft: 10,
    fontSize: 18,
  },
});

export default AccountScreen;
