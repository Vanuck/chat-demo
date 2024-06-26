import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

// Define the Start component
const Start = ({ navigation }) => {
  const auth = getAuth();
  // State for the name input
  const [name, setName] = useState("");
  // State for the background color choice
  const [background, setBackground] = useState("");
  const colors = ["#312F4D", "#212115", "#611340", "#183C0C"];

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          background: background,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Background-Image.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Text style={styles.appTitle}>Chat App</Text>
        <View style={styles.box}>
          <Text>Hello and Welcome!</Text>
          <TextInput
            accessibilityLabel="Username input"
            accessibilityRole="text"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
          <Text style={styles.chooseBackgroundColor}>
            Please Pick A Background Color
          </Text>
          {/* Choose background color of chat \*/}
          <View style={styles.colorButtonsBox}>
            {colors.map((color, index) => (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose your backgroundcolor for your chat."
                accessibilityRole="button"
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selected,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          {/* Start Chat with TouchableOpacity\*/}
          <TouchableOpacity
            accessibilityLabel="Start Chatting"
            accessibilityRole="button"
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#04156A",
    margin: 20,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  box: {
    backgroundColor: "#F0F68D",
    padding: 30,
    width: "88%",
    height: "44%",
    alignItems: "center",
    justifyContent: "center",
  },
  colorButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  chooseBackgroundColor: {
    flex: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#040523",
  },
  selected: {
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default Start;
