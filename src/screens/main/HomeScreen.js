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
import { TextInput } from "react-native-paper";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();

  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyxSTbkuYMiaYuOqYDaWgsdLYW9w901bRzviUZaSxiThheYn89RuBfbtXu_rQVnGrO5gw/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("API Hatası:", err);
      });
  }, []);

  return (
    <View
      style={{ paddingHorizontal: wp("3%") }}
      className="flex-1 bg-[#f8f8f8] items-center"
    >
      {/* {products.map((item, index) => (
        <View key={index} style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>Kalori: {item.calories}</Text>
        </View>
      ))} */}
      <TextInput
        mode="outlined"
        dense
        autoCapitalize="none"
        placeholder="Ürün Ara"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => console.log("holll")}
        returnKeyType="search"
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
        right={<TextInput.Icon icon="magnify" />}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: hp("5%") }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-medium text-xl italic">Günlük Besin Durumu</Text>
        <ProgressBar />
        <ConsumedList />
        <View style={{ gap: hp("2%"), marginTop: hp("3%") }}>
          <Text className="font-medium text-xl italic">Favoriler</Text>
          {favorites.length === 0 ? (
            <View
              className="flex-row bg-[#d9ebd3] rounded-2xl justify-center items-center"
              style={{
                height: wp("11%"),
                alignItems: "center",
                marginTop: wp("4%"),
                gap: wp("2%"),
              }}
            >
              <Image
                source={require("../../assets/heartIcon.png")}
                style={{
                  width: wp("11%"),
                  height: wp("10%"),
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
