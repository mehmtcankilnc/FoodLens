import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lottie/animation.json")}
        autoPlay
        loop={false}
        style={{ width: 300, height: 300 }}
      />
      <Text className="font-bold text-white text-4xl">FoodLens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3f6942",
    alignItems: "center",
    justifyContent: "center",
  },
});
