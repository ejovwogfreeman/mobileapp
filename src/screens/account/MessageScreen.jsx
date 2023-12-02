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
      // navigation.navigate("Account");
    });
  };

  useEffect(() => {
    if (!drawerOpen) {
      openBottomDrawer();
    }
  }, [drawerOpen]);

  const messages = [
    {
      id: 1,
      username: "User1",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Hello, this is message 1.",
    },
    {
      id: 2,
      username: "User2",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Message 2 here!",
    },
    {
      id: 3,
      username: "User3",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "This is message 3.",
    },
    {
      id: 4,
      username: "User4",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Message 4 for you.",
    },
    {
      id: 5,
      username: "User5",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Fifth message is here.",
    },
    {
      id: 6,
      username: "User6",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Hello from User 6.",
    },
    {
      id: 7,
      username: "User7",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Message 7 content.",
    },
    {
      id: 8,
      username: "User8",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Eighth message is here.",
    },
    {
      id: 9,
      username: "User9",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "User 9 says hi.",
    },
    {
      id: 10,
      username: "User10",
      profilepic: require("../../../assets/defaultprofile.jpg"),
      message: "Tenth and final message.",
    },
  ];

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
        <Text style={styles.bigText}>Messages</Text>
        {messages ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.messages}
                onPress={() =>
                  navigation.navigate("ChatScreen", { user: item })
                }
              >
                <Image source={item.profilepic} style={styles.image} />
                <View style={styles.texts}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.smallText}>No Message yet</Text>
        )}
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

export default MessageScreen;
