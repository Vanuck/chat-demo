import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { Audio } from "expo-av";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// Extract name and background from route.params
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);
  let soundObject = null;

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
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

  // Prevent rendering of InputToolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Render an action button in Inputfield
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };
  // Render a MapView if the currentMessage contains location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (
      currentMessage.location &&
      currentMessage.location.latitude !== 0 &&
      currentMessage.location.longitude !== 0
    ) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 15, margin: 4 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // Render Audio Messages
  const renderAudioBubble = (props) => {
    return (
      <View {...props}>
        <TouchableOpacity
          style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
          onPress={async () => {
            try {
              if (soundObject) soundObject.unloadAsync();
              const { sound } = await Audio.Sound.createAsync({
                uri: props.currentMessage.audio,
              });
              soundObject = sound;
              await sound.playAsync();
            } catch (error) {
              console.error("Error playing audio:", error);
            }
          }}
        >
          <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
            Play Sound
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // useEffect hook to set user name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // useEffect hook to set messages db
  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentSnapshot) => {
        let newMessages = [];
        documentSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessagesHistory(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
      if (soundObject) soundObject.unloadAsync();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("chat_messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessagesHistory = async (listsToCache) => {
    try {
      await AsyncStorage.setItem("chat_messages", JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  /* Render a View component with dynamic background color */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.appTitle}>Time to Chat!</Text>
      <GiftedChat
        bottomOffset={220}
        placeholder={"Type Here"}
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        accessible={true}
        accessibilityLabel="send"
        accessibilityHint="Sends a message"
        accessibilityRole="button"
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderAudioBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: route.params.name,
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
