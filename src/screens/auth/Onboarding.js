import { View, Text, Pressable } from "react-native";
import React from "react";

export default function Onboarding({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Onboarding</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text>Giriş ekranı</Text>
      </Pressable>
    </View>
  );
}
