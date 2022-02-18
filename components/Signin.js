import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email: " + email + " password: " + password);

  return (
    <LoginScreen
      disableSocialButtons="true"
      haveAccountText="New User? Sign Up Here"
      onLoginPress={() => {
        navigation.navigate("Chat");
      }}
      onHaveAccountPress={() => {
        // navigation.navigate("Signup");
      }}
      onEmailChange={(email) => {
        setEmail(email);
      }}
      onPasswordChange={(password) => {
        setPassword(password);
      }}
    />
  );
};

export default Signin;
