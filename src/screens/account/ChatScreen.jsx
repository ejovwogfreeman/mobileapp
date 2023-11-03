import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const ChatScreen = ({ route, navigation }) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const { user } = route.params;

  const messages = [
    {
      id: 1,
      username: "User1",
      sender: false,
      message:
        "Hello, this is message 1. Fifth message Fifth message Fifth message",
      date: "10:59pm",
    },
    {
      id: 2,
      username: "User2",
      sender: true,
      message: "Message 2 here! Fifth message",
      date: "10:59pm",
    },
    {
      id: 3,
      username: "User1",
      sender: false,
      message: "Hello, this is message 3.",
      date: "10:59pm",
    },
    {
      id: 4,
      username: "User2",
      sender: true,
      message: "Message 4 for you Fifth message.",
      date: "10:59pm",
    },
    {
      id: 5,
      username: "User1",
      sender: false,
      message: "Fifth message is here.  is here.",
      date: "10:59pm",
    },
    {
      id: 6,
      username: "User2",
      sender: true,
      message:
        "Hello from User 6. Hello from User 6.Hello from User 6.Hello from User 6.Hello from User 6.Hello from User 6.Hello from User 6.",
      date: "10:59pm",
    },
    {
      id: 7,
      username: "User1",
      sender: false,
      message: "Fifth message is here.",
      date: "10:59pm",
    },
    {
      id: 8,
      username: "User2",
      sender: true,
      message: "Hello from User 6.",
      date: "10:59pm",
    },
    {
      id: 9,
      username: "User1",
      sender: false,
      message: "Fifth message is here.",
      date: "10:59pm",
    },
    {
      id: 10,
      username: "User2",
      sender: true,
      message: "Hello from User 6.",
      date: "10:59pm",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ImageBackground
        source={require("../../../assets/chat.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
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
            <View style={styles.userChat}>
              <Image source={user.profilepic} style={styles.image} />
              <Text style={styles.bigText}>{user.username}</Text>
            </View>
            <View style={styles.messageContainer}>
              <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.sender
                        ? styles.senderMessages
                        : styles.recieverMessages
                    }
                    onPress={() =>
                      navigation.navigate("ChatScreen", { user: item })
                    }
                  >
                    <View style={item.sender ? styles.sender : styles.reciever}>
                      <Text style={styles.username}>{item.username}</Text>
                      <Text style={styles.message}>{item.message}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  ...styles.chatForm,
                  marginBottom: keyboardOpen ? 67 : 0,
                }}
              >
                <View style={styles.inputbox}>
                  <TextInput
                    placeholderTextColor={colors.opaque}
                    style={styles.input}
                    placeholder="Type your message here..."
                  />
                  <TouchableOpacity style={styles.sendBtn}>
                    <Icon
                      name="send"
                      style={{ transform: [{ rotate: "-30deg" }] }}
                      size={24}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: "100%",
  },
  closeButton: {
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  messageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userChat: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.opaque,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  bigText: {
    fontSize: 30,
    marginLeft: 15,
    color: colors.white,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  recieverMessages: {
    paddingVertical: 5,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  senderMessages: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  reciever: {
    backgroundColor: colors.opaque,
    borderRadius: 5,
    padding: 10,
    maxWidth: 300,
  },
  sender: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    padding: 10,
    maxWidth: 300,
  },
  username: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    color: colors.secondary,
    fontSize: 17,
  },
  date: {
    color: colors.secondary,
    fontSize: 13,
    textAlign: "right",
  },
  chatForm: {
    paddingTop: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.opaque,
  },
  inputbox: {
    borderWidth: 1,
    borderColor: colors.opaque,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgba(256,256,256,0.05)",
  },
  input: {
    height: 40,
    color: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  sendBtn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 5,
    width: 70,
  },
});

export default ChatScreen;
