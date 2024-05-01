import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Destructure name and background from route.params
const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;

  // useEffect hook to set navigation options
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  /* Render a View component with dynamic background color */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.appTitle}>Time to Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#ECF00F",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default Chat;
