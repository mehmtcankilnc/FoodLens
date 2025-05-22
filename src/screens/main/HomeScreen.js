import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { BackHandler, Alert } from "react-native";
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
import SearchResultPage from "../../components/searchResultPage";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();

  const [result, setResult] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);
  useEffect(() => {
    const backAction = () => {
      if (isSearched) {
        setIsSearched(false);
        return true; // bu, geri işlemini engeller
      } else {
        Alert.alert("Uygulamadan çıkmak istiyor musun?", "", [
          {
            text: "Hayır",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Evet", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // cleanup
  }, [isSearched]);

  const searchFood = async (query) => {
    console.log("1");
    try {
      const response = await axios.post(
        "http://192.168.1.41/fatsecret/search",
        { query: query }
      );

      const foods = response?.data?.foods?.food;
      console.log("2");
      if (!foods) {
        console.error("❌ FatSecret sonucu boş veya geçersiz:", response?.data);
        setResult([]);
      } else {
        console.log("✅ Çekilen 'food' listesi:", foods);
        setResult(foods);
      }

      setIsSearched(true); // buraya al
    } catch (error) {
      console.error("FatSecret Hatası:", error.message);
      setIsSearched(true);
      setResult([]);
    }
  };

  const translateText = async (text, fromLang, toLang) => {
    try {
      const response = await fetch("http://192.168.1.41:3001/translate", {
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

      console.log("✅ Translate API'den dönen veri:", result);
      console.log("✅ Çevrilmiş metin:", result.translatedText);

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
        onSubmitEditing={() => searchFood(searchText)} // enter/search tuşuna basıldığında arama yapar
        returnKeyType="search" // klavyede "search" görünür
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
      {isSearched ? (
        <SearchResultPage result={result} />
      ) : (
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
          <Text className="font-medium text-xl italic">
            Günlük Besin Durumu
          </Text>
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
      )}
    </View>
  );
}
