import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChatGptProvider } from "react-native-chatgpt";
import { getTopInset } from "rn-iphone-helper";
import Root from "./src/root";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatGptProvider requestTimeout={1000 * 60 * 10}>
        <Root />
      </ChatGptProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
