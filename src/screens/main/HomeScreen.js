import {
  View,
  Text,
  TextInput,
  Animated,
  ScrollView,
  Image,
} from "react-native";
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
import FavoriteCard from "../../components/favoriteCard";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();
  const consumed = useConsumedToday();

  const DAILY_TARGET = {
    fat: 70,
    carbohydrates: 300,
    proteins: 50,
  };

  const fatProgress = useRef(new Animated.Value(0)).current;
  const carbProgress = useRef(new Animated.Value(0)).current;
  const proteinProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (consumed && consumed.length > 0) {
      let totalFat = 0;
      let totalCarbs = 0;
      let totalProteins = 0;

      consumed.forEach((item) => {
        const n = item.nutriments;
        totalFat += n?.fat_serving || 0;
        totalCarbs += n?.carbohydrates_serving || 0;
        totalProteins += n?.proteins_serving || 0;
      });

      Animated.timing(fatProgress, {
        toValue: (totalFat / DAILY_TARGET.fat) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();
      Animated.timing(carbProgress, {
        toValue: (totalCarbs / DAILY_TARGET.carbohydrates) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();
      Animated.timing(proteinProgress, {
        toValue: (totalProteins / DAILY_TARGET.proteins) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [consumed]);

  const fatHeight = fatProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  const carbHeight = carbProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
  const proteinHeight = proteinProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={{ padding: wp("3%") }} className="flex-1 bg-[#f8f8f8]">
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
              height: fatHeight,
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
              height: carbHeight,
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
              height: proteinHeight,
              position: "absolute",
              bottom: 0,
            }}
          />
          <Text>Protein</Text>
        </View>
      </View>

      <View style={{ gap: hp("2%"), marginTop: hp("3%") }}>
        <Text className="font-bold text-2xl">Favoriler</Text>
        {favorites.length === 0 ? (
          <View className="items-center justify-center">
            <Image
              source={require("../../assets/emptyFavorites.png")}
              style={{
                width: wp("25%"),
                height: wp("25%"),
                resizeMode: "contain",
              }}
            />
            <Text className="font-semibold text-base">Henüz favori yok</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row" style={{ gap: wp("4%") }}>
              {favorites.map((item) => (
                <FavoriteCard
                  key={item.id}
                  barcode={item.barcode}
                  name={item.name}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <ConsumedList />
    </View>
  );
}
