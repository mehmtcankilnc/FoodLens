import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFavorites } from "../../hooks/useFavorites";
import ConsumedList from "../../components/consumedCard";
import { useAuth } from "@clerk/clerk-expo";
import { cleanOldConsumed } from "../../services/consumedService";
import FavoriteCard from "../../components/favoriteCard";
import ProgressBar from "../../components/progressBar";
import axios from "axios";
import { TextInput } from "react-native-paper";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();

  const [result, setResult] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  const searchFood = async (query) => {
    try {
      const response = await axios.post(
        "http://192.168.83.238:3001/fatsecret/search",
        {
          query: query,
        }
      );

      const foods = response?.data?.foods?.food;

      if (!foods) {
        console.error("❌ FatSecret sonucu boş veya geçersiz:", response?.data);
        return [];
      }

      foods.slice(0, 1);
      console.log(foods);
      setResult(foods);
      return foods;
    } catch (error) {
      console.error("FatSecret Hatası:", error.message);
      return null;
    }
  };

  const translateText = async (text, fromLang, toLang) => {
    try {
      const response = await fetch("http://192.168.83.238:3001/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          fromLang,
          toLang,
        }),
      });

      const result = await response.json();
      setTranslatedText(result.translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      return null;
    }
  };

  return (
    <View
      style={{ paddingHorizontal: wp("3%") }}
      className="flex-1 bg-[#f8f8f8] items-center"
    >
      <TextInput
        mode="outlined"
        dense
        autoCapitalize="none"
        placeholder="Ürün Ara"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        style={{
          width: wp("80%"),
          height: hp("6%"),
          backgroundColor: "#f8f8f8",
          marginTop: -hp("4%"),
          zIndex: 10,
        }}
        theme={{
          colors: {
            primary: "black",
            text: "black",
            placeholder: "gray",
          },
        }}
        right={
          <TextInput.Icon
            onPress={() => searchFood(searchText)}
            icon="magnify"
          />
        }
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp("5%") }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() =>
            translateText(
              result && result.length > 0
                ? result[0].food_description
                : "tryout",
              "en",
              "tr"
            )
          }
        >
          <Text>{translatedText ? translatedText : "çevir"}</Text>
        </Pressable>
        <Text className="font-medium text-xl italic">Günlük Besin Durumu</Text>
        <ProgressBar />
        <ConsumedList />
        <View style={{ gap: hp("2%"), marginTop: hp("3%") }}>
          <Text className="font-medium text-xl italic">Favoriler</Text>
          {favorites.length === 0 ? (
            <View
              className="items-center justify-center"
              style={{ padding: wp("3%") }}
            >
              <Image
                source={require("../../assets/heartIcon.png")}
                style={{
                  width: wp("25%"),
                  height: wp("25%"),
                  resizeMode: "contain",
                }}
              />
              <Text className="text-base">Henüz Favori Yok</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ padding: wp("3%") }}
            >
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
      </ScrollView>
    </View>
  );
}
