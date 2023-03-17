import React from "react";
import { useChatGpt } from "react-native-chatgpt";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import GPTLayout from "./gpt";
import { getTopInset } from "rn-iphone-helper";

export default function Root() {
  const { status, login } = useChatGpt();

  if (status === "initializing") return null;

  if (status === "logged-out" || status === "getting_auth_token") {
    return (
      <View style={styles.container}>
        <Button title="Login to ChatGPT" onPress={login} />
        {status === "getting_auth_token" && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>
    );
  }

  return <GPTLayout />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getTopInset(),
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
