// import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, Alert } from "react-native";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  // new state that shows network connectivity status
  const connectionStatus = useNetInfo();

  // Network connectivity status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCZLNX85zJbgGBR2V6BQQ7Jd3x7BALkHfY",
    authDomain: "chat-app-2c90a.firebaseapp.com",
    projectId: "chat-app-2c90a",
    storageBucket: "chat-app-2c90a.appspot.com",
    messagingSenderId: "329356845086",
    appId: "1:329356845086:web:609007333e1c014d35ce0f",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //initialize the storage handler
  const storage = getStorage(app);

  // Create the navigator
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
