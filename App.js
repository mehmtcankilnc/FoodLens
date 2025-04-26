import "./gesture-handler";
import "./global.css";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
