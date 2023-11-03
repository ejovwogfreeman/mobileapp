import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const SettingsScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openBottomDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const closeBottomDrawer = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 0.5,
      useNativeDriver: false,
    }).start(() => {
      setDrawerOpen(false);
      navigation.goBack();
    });
  };

  useEffect(() => {
    if (!drawerOpen) {
      openBottomDrawer();
    }
  }, [drawerOpen]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={closeBottomDrawer}
          style={styles.closeButton}
        >
          <Icon name="close" size={30} color={colors.secondary} />
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddHome")}
            style={styles.menuButton}
          >
            <Text style={styles.menuText}>Add Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddWork")}
            style={styles.menuButton}
          >
            <Text style={styles.menuText}>Add Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            style={styles.menuButton}
          >
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  drawer: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 5,
    borderTopColor: colors.opaque,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: "100%",
  },
  closeButton: {
    alignItems: "flex-end",
  },
  menuItem: {
    marginTop: 10,
    backgroundColor: "rgba(256, 256, 256, 0.05)",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 30,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "rgba(256, 256, 256, 0.05)",
  },
  menuText: {
    fontSize: 16,
    color: colors.secondary,
  },
});

export default SettingsScreen;
