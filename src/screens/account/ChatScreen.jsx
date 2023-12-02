import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../components/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useUser } from "../../../userContext";
import io from "socket.io-client";
import axios from "axios";
import { getUserToken } from "../../../api";

const ChatScreen = ({ route, navigation }) => {
  // const scrollRef = useRef();

  const { user } = useUser();

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

  const { users, roomName, conversation } = route.params;

  // console.log("roomName", roomName);

  // const [socket, setSocket] = useState(null);
  const baseUrl = "http://172.20.10.4:8000";
  // const socket = io(baseUrl);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const flatListRef = useRef();
  const [friend, setFriend] = useState({});

  useEffect(() => {
    socket.current = io(baseUrl);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        conversationId: data.conversationId,
        text: data.text,
        createdAt: Date.now(),
      });
      console.log("data", data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/message/${conversation?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversation?._id]);

  const receiverId = conversation?.members.find(
    (memberId) => memberId !== user._id
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getUserToken();
        const requestOptions = {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        };

        const res = await axios.get(
          `${baseUrl}/api/users/user/${receiverId}`,
          requestOptions
        );
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation?._id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setText("");
    inputRef.current.clear();

    setTimeout(() => {
      setText("");
    }, 100);

    const message = {
      senderId: user._id,
      receiverId,
      text,
      conversationId: roomName,
    };

    socket.current.emit("sendMessage", message);

    try {
      const res = await axios.post(`${baseUrl}/api/message`, message);

      setMessages([...messages, res.data]);
    } catch (err) {
      console.error("error", err);
    }
  };

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
              <Image
                source={require("../../../assets/defaultprofile.jpg")}
                style={styles.image}
              />
              <Text style={styles.bigText}>{user.username}</Text>
            </View>
            <View style={styles.messageContainer}>
              {/* <FlatList
                ref={flatListRef}
                onContentSizeChange={() =>
                  flatListRef.current.scrollToEnd({ animated: true })
                }
                data={messages}
                keyExtractor={(item, index) =>
                  item?._id?.toString() || index.toString()
                }
                renderItem={({ item }) => (
                  <View
                    style={
                      item.senderId === user._id
                        ? styles.senderMessages
                        : styles.recieverMessages
                    }
                    onPress={() =>
                      navigation.navigate("ChatScreen", { user: item })
                    }
                  >
                    <View
                      style={
                        item.senderId === user._id
                          ? styles.sender
                          : styles.reciever
                      }
                    >
                      <Text style={styles.username}>
                        {item.senderId === user._id
                          ? user.username
                          : friend?.username}
                      </Text>
                      <Text style={styles.message}>{item.text}</Text>
                      <Text style={styles.date}>
                        {new Date(item.createdAt).toDateString() +
                          " | " +
                          new Date(item.createdAt).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                )}
              /> */}

              <ScrollView
                ref={flatListRef}
                onContentSizeChange={() =>
                  flatListRef.current.scrollToEnd({ animated: true })
                }
              >
                {messages.map((item, index) => (
                  <View
                    key={item?._id?.toString() || index.toString()}
                    style={
                      item.senderId === user._id
                        ? styles.senderMessages
                        : styles.recieverMessages
                    }
                    onPress={() =>
                      navigation.navigate("ChatScreen", { user: item })
                    }
                  >
                    <View
                      style={
                        item.senderId === user._id
                          ? styles.sender
                          : styles.reciever
                      }
                    >
                      <Text style={styles.username}>
                        {item.senderId === user._id
                          ? user.username
                          : friend?.username}
                      </Text>
                      <Text style={styles.message}>{item.text}</Text>
                      <Text style={styles.date}>
                        {new Date(item.createdAt).toDateString() +
                          " | " +
                          new Date(item.createdAt).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View
                style={{
                  ...styles.chatForm,
                  marginBottom: keyboardOpen ? 67 : 0,
                }}
              >
                <View style={styles.inputbox}>
                  <TextInput
                    ref={inputRef}
                    placeholderTextColor={colors.opaque}
                    style={styles.input}
                    placeholder="Type your message here..."
                    onChangeText={(newText) => setText(newText)}
                  />
                  <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={handleSendMessage}
                  >
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
    paddingBottom: 20,
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
