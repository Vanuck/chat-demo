import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Destructure name and background from route.params
const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;

  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Customize speech bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6495ED",
          },
          left: {
            backgroundColor: "#EB984E",
          },
        }}
      />
    );
  };

  // useEffect hook to set navigation options
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // useEffect hook to set messages options
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placehold.co/400x400",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  /* Render a View component with dynamic background color */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.appTitle}>Time to Chat!</Text>
      <GiftedChat
        bottomOffset={220}
        placeholder={"Type Here"}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "99%",
    height: "98%",
  },
  appTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#ECF00F",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default Chat;
