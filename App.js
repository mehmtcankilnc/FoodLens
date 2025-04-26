import "./gesture-handler";
import "./global.css";
import { Text, View } from "react-native";
import BottomNav from "./src/navigation/BottomNav";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
}
