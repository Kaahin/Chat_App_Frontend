import * as React from "react";
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./components/Chat";
import Signin from "./components/Signin";
// import Signup from "./components/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin" component={Signin} />
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "Ma'at",
            headerRight: () => (
              // <Button
              //   onPress={() => alert("This is a button!")}
              //   title="Info"
              //   color="#fff"
              // />
              <TouchableOpacity
                style={styles.FacebookStyle}
                activeOpacity={0.5}
                onPress={() => alert("This is a button!")}
              >
                <Image
                  source={require("../Frontend/assets/logout.png")}
                  style={styles.ImageIconStyle}
                />
                <View style={styles.SeparatorLine} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    padding: 30,
  },
  buttonGPlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonFacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});
