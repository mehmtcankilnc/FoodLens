import { View, Text, TextInput, Animated, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFavorites } from "../../hooks/useFavorites";
import ConsumedList from "../../components/consumedCard";
import { useAuth } from "@clerk/clerk-expo";
import { cleanOldConsumed } from "../../services/consumedService";
import { useConsumedToday } from "../../hooks/useConsumedToday";
export default function HomeScreen() {
  const favorites = useFavorites();
  const [input, setInput] = useState("");
  const progress = useRef(new Animated.Value(0)).current;

  const { userId } = useAuth();
  const consumed = useConsumedToday();

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  const handleProgressChange = (text) => {
    setInput(text);
    const value = parseFloat(text) || 0;

    Animated.timing(progress, {
      toValue: value,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={{ padding: wp("3%") }} className="flex-1 bg-[#f8f8f8]">
      <TextInput
        placeholder="yağ miktarı gir"
        onChangeText={handleProgressChange}
        value={input}
        keyboardType="numeric"
        style={{ marginBottom: 20 }}
      />
      <View
        style={{
          padding: wp("2%"),
        }}
        className="flex-row justify-around"
      >
        <View
          style={{
            width: wp("25%"),
            height: hp("22%"),
            backgroundColor: "#f7f296",
            borderRadius: 35,
            justifyContent: "center",
            overflow: "hidden",
            alignItems: "center",
            elevation: 7,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#ffda03",
              width: "100%",
              height: animatedHeight,
              position: "absolute",
              bottom: 0,
            }}
          />
          <Text>Yağ</Text>
        </View>

        <View
          style={{
            width: wp("25%"),
            height: hp("22%"),
            backgroundColor: "#ffb49c",
            borderRadius: 35,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            elevation: 7,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#ff7a1b",
              width: "100%",
              height: animatedHeight,
              position: "absolute",
              bottom: 0,
            }}
          />
          <Text>Karbonhidrat</Text>
        </View>

        <View
          style={{
            width: wp("25%"),
            height: hp("22%"),
            backgroundColor: "#bcdceb",
            borderRadius: 35,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            elevation: 7,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#5e8aed",
              width: "100%",
              height: animatedHeight,
              position: "absolute",
              bottom: 0,
            }}
          />
          <Text>Protein</Text>
        </View>
      </View>
      <View>
        <Text>Favoriler</Text>
        <View>
          <Text>Favori Ürünler:</Text>
          {favorites.map((item) => (
            <Text key={item.id}>
              {item.name} - {item.barcode}
            </Text>
          ))}
        </View>
        <Text>aaa</Text>

        <ConsumedList />
      </View>
    </View>
  );
}
