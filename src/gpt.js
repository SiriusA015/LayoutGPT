import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useChatGpt } from "react-native-chatgpt";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import { getBottomInset, getTopInset } from "rn-iphone-helper";
import { res } from "./tmp";
import * as Updates from "expo-updates";
import * as SecureStore from "expo-secure-store";

export default function GPTLayout() {
  const { sendMessage } = useChatGpt();

  const [loading, setLoading] = useState(true);

  const [rawRes, setRawRes] = useState("");
  const prevRaw = useRef("");
  const [layout, setLayout] = useState("");
  const [request, setRequest] = useState("");

  const [debugVisible, setDebugVisible] = useState(false);

  const timerRef = useRef();

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  const handleSendMessage = (request, options) => {
    setLoading(true);
    sendMessage({
      options,
      message: options
        ? "Continue"
        : `${request}. Use HTML. Try to make it more beautiful. Must be mobile friendly.`,
      onAccumulatedResponse: ({
        message,
        isDone,
        conversationId,
        messageId,
      }) => {
        message = prevRaw.current + message;

        setRawRes(message);

        clearTimer();
        if (isDone) {
          prevRaw.current = "";
          try {
            let _layout = message.substring(message.indexOf("`"));
            _layout = _layout.substring(_layout.indexOf("\n"));
            _layout = _layout
              .substring(0, _layout.indexOf("`"))
              .replaceAll("`", "");
            console.log("Layout:", _layout);

            if (_layout) {
              setLayout(_layout);
            } else setLayout(message);

            setLoading(false);
          } catch (e) {
            setLayout(message);
          }
        } else {
          timerRef.current = setTimeout(() => {
            console.log("Sending continue event");
            prevRaw.current = message;
            handleSendMessage("", { messageId, conversationId });
          }, 3000);
        }
      },
      onError: (e) => {
        setLayout("ERROR " + JSON.stringify(e));
        setLoading(false);
      },
    });
  };

  return (
    <View style={styles.root}>
      {!!layout && <WebView source={{ html: layout }} />}

      {loading && (
        <View style={StyleSheet.absoluteFill}>
          <ActivityIndicator color={"gray"} />
        </View>
      )}

      {debugVisible && (
        <View style={[StyleSheet.absoluteFill]}>
          <ScrollView
            style={{ backgroundColor: "white", opacity: 0.9 }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingTop: getTopInset(),
            }}
          >
            <Button
              onPress={() => {
                SecureStore.deleteItemAsync(
                  "react_native_chatgpt_access_token"
                );
                Updates.reloadAsync();
              }}
              title="Force logout"
            />
            <Text>{rawRes}</Text>
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={request}
              onChangeText={setRequest}
              style={{
                flex: 1,
                height: 50,
                borderWidth: 1,
                marginBottom: getBottomInset(),
                backgroundColor: "white",
                paddingHorizontal: 10,
              }}
            />
            <TouchableOpacity onPress={() => handleSendMessage(request)}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setDebugVisible(!debugVisible)}
        style={{
          position: "absolute",
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "white",
          right: -20,
          bottom: getBottomInset() + 50,
          borderWidth: 1,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#36393e",
  },
});
