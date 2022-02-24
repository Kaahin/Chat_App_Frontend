import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
import { Link } from "@react-navigation/native";
import { io } from "socket.io-client";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const onSubmit = (email, password) => {};
  const SERVER = "https://0a50-188-149-22-223.ngrok.io";

  io(SERVER).once("connect", () => {
    console.log("Frontend is connected with Backend");
  });
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button
        onPress={() => {
          console.log("Email: " + email + "; Password: " + password);
        }}
        title="Sign in"
        color="#841584"
      />
      <Link to={{ screen: "Signup" }}>Sign up here!</Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Signin;
