// import React from "react";
// import { colors } from "../../components/Colors";
// import { View, Text, StyleSheet } from "react-native";

// const ActivityScreen = () => {
//   return (
//     <View style={styles.activityContainer}>
//       <Text style={styles.bigText}>Trips</Text>
//       <Text style={styles.smallText}>
//         You don't have any completed trips yet
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   activityContainer: {
//     padding: 20,
//     backgroundColor: colors.primary,
//     flex: 1,
//   },
//   bigText: {
//     fontSize: 30,
//     color: colors.white,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   smallText: {
//     fontSize: 20,
//     color: colors.white,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// export default ActivityScreen;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const TripScreen = ({ navigation }) => {
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
        <Text style={styles.bigText}>Completed Trips</Text>
        <Text style={styles.smallText}>You have no completed trips yet.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  bigText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 10,
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
  messages: {
    borderBottomWidth: 1,
    borderBottomColor: colors.opaque,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  texts: {
    marginLeft: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  username: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    color: colors.secondary,
  },
});

export default TripScreen;
