import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { colors } from "../../components/Colors";

const MessageScreen = ({ navigation }) => {
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
        <Text style={styles.text}>Custom Bottom Drawer</Text>
        <TouchableOpacity onPress={closeBottomDrawer}>
          <Text style={styles.closeButton}>Close Drawer</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: "100%",
  },
  text: {
    fontSize: 24,
    color: colors.white,
  },
  closeButton: {
    fontSize: 16,
    color: "blue",
    marginTop: 16,
    color: colors.white,
  },
});

export default MessageScreen;
