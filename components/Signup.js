import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
import { io } from "socket.io-client";

const Signup = ({ navigation }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const socketRef = useRef();
  const SERVER = "https://0a50-188-149-22-223.ngrok.io";

  const onSubmit = (first, last, email, password) => {
    let headersList = {
      "Content-Type": "application/json",
    };

    fetch(
      `${SERVER}/signup?first=${first}&last=${last}&email=${email}&password=${password}`,
      {
        method: "GET",
        headers: headersList,
      }
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setFirst}
        value={first}
        placeholder="first name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLast}
        value={last}
        placeholder="Last name"
      />
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
          // console.log(
          //   "First Name: " +
          //     first +
          //     "; Last Name: " +
          //     last +
          //     "; Email: " +
          //     email +
          //     "; Password: " +
          //     password
          // );

          onSubmit(first, last, email, password);
        }}
        title="Sign up"
        color="#841584"
      />
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
export default Signup;
