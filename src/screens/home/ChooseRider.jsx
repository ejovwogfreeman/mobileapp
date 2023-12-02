import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import io from "socket.io-client";
import { useUser } from "../../../userContext";
import { getUserToken } from "../../../api";
import { colors } from "../../components/Colors";
import axios from "axios";

const ChooseRider = ({ navigation }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const baseUrl = "http://172.20.10.4:8000";

  useEffect(() => {
    const socketInstance = io(baseUrl);
    setSocket(socketInstance);

    let userId = user?._id;

    socketInstance.emit("addUser", userId);

    socketInstance.on("getUsers", async (updatedUsers) => {
      // Update the user list in your React component
      setUsers(updatedUsers);

      // Fetch additional user information based on user IDs
      const usersWithDetails = await Promise.all(
        updatedUsers.map(async (u) => {
          try {
            // Fetch the token using your getUserToken function
            const token = await getUserToken();
            // Include the token in the Authorization header
            const requestOptions = {
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            };

            // Make the request to fetch user details
            const userDetailsResponse = await fetch(
              `${baseUrl}/api/users/user/${u.userId}`,
              requestOptions
            );

            // Parse the JSON response
            const userDetails = await userDetailsResponse.json();
            return { ...u, ...userDetails };
          } catch (error) {
            console.error(error.message);
            // Handle the error or log it as needed
            return u; // Return the original user data in case of an error
          }
        })
      );

      // Update the user list with additional details
      setUsers(usersWithDetails);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleUserClick = async (clickedUser) => {
    const fetchConversationEndpoint = `${baseUrl}/api/conversation/${user?._id}/${clickedUser?._id}`;
    const postData = {
      senderId: user?._id,
      receiverId: clickedUser.userId,
    };

    try {
      const token = await getUserToken();
      const requestOptions = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      };

      const conversationResponse = await axios.get(
        fetchConversationEndpoint,
        requestOptions
      );

      const conversation = conversationResponse.data;

      const createNewConversation = async () => {
        const createNewEndpoint = `${baseUrl}/api/conversation`;
        const createNewResponse = await axios.post(
          createNewEndpoint,
          postData,
          requestOptions
        );

        if (createNewResponse.status === 200) {
          const newConversation = createNewResponse.data;
          navigateToChatScreen(newConversation?._id, clickedUser, conversation);
        } else {
          console.error("Failed to create new conversation");
        }
      };

      if (!conversation) {
        await createNewConversation();
      } else {
        const existingConversation =
          (conversation.members.includes(postData.senderId) &&
            conversation.members.includes(postData.receiverId) &&
            postData.senderId !== postData.receiverId) ||
          (conversation.members.includes(postData.senderId) &&
            conversation.members.includes(postData.receiverId) &&
            postData.senderId === postData.receiverId);

        if (existingConversation) {
          navigateToChatScreen(conversation?._id, clickedUser, conversation);
        } else {
          await createNewConversation();
        }
      }
    } catch (error) {
      console.error("Error handling user click:", error.message);
    }
  };

  const navigateToChatScreen = (roomName, clickedUser, conversation) => {
    navigation.navigate("Account", {
      screen: "ChatScreen",
      params: {
        roomName,
        users: [user, clickedUser],
        conversation,
      },
    });
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
      <View>
        <Text style={styles.choose}>AVAILABLE RIDERS</Text>
        <View style={styles.usersContainer}>
          {users.map(
            (u) =>
              u.accountType === "rider" && (
                <TouchableOpacity
                  key={u._id}
                  style={styles.userCard}
                  onPress={() => handleUserClick(u)}
                >
                  <Image
                    source={require("../../../assets/defaultprofile.jpg")}
                    style={styles.image}
                  />
                  <Text style={styles.username}>
                    {u.fullName || u.username}
                  </Text>
                  <View style={styles.online}>
                    <Text style={styles.onlineText}>ONLINE</Text>
                  </View>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>
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
  choose: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  usersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    flexWrap: "wrap",
    // backgroundColor: "red",
  },
  userCard: {
    borderWidth: 1,
    borderColor: colors.opaque,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: "46%",
    margin: 7,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: "auto",
  },
  username: {
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  online: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  onlineText: { color: colors.secondary, fontSize: 10 },
});

export default ChooseRider;
