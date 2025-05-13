import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";

import MyModal from "../components/MyModal";
import { PaperProvider, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExtraInfo from "../components/extraInfo";
import Nutriments from "../components/productDetail/nutriments";
import HealthInfo from "../components/healthInfo";
import { addFavorite, removeFavorite } from "../services/favoriteServices";
import { useAuth } from "@clerk/clerk-expo";
import { useFavorites } from "../hooks/useFavorites";

export default function ProductDetail({ route }) {
  const { userId } = useAuth();
  const { product } = route.params;
  const [amount, setAmount] = useState("100");
  const [favoritePress, setFavoritePress] = useState(false);

  const favorites = useFavorites();
  useEffect(() => {
    const isFav = favorites.some((item) => item.barcode === product.id);
    setFavoritePress(isFav);
  }, [favorites, product.id]);

  const handleFavoritePress = () => {
    setFavoritePress((prev) => !prev);
    if (favoritePress === false) {
      addFavorite(userId, {
        barcode: product.id,
        name: product.product_name,
      });
    } else {
      const existing = favorites.find((item) => item.barcode === product.id);
      removeFavorite(userId, existing.id);
    }
  };

  const ingredientsText = product.ingredients_text?.toLowerCase();

  let palmText = "";
  let palmColor = "";
  let sugarLevel = "";
  let sugarColor = "";
  const grade = product.nutrition_grades_tags?.[0];
  console.log(grade);

  if (!ingredientsText) {
    palmColor = "gray";
    palmText = "İçerik bilgisi yok";
    sugarLevel = "İçerik bilgisi yok";
  } else {
    const palmKeywords = [
      "palm",
      "palmolein",
      "palm kernel",
      "hydrogenated palm",
    ];
    const hasPalmOil = palmKeywords.some((keyword) =>
      ingredientsText.includes(keyword)
    );

    palmColor = hasPalmOil ? "red" : "green";
    palmText = hasPalmOil ? "Palm içerir" : "Palm içermez";
  }

  const sugarPer100g = product.nutriments?.sugars;

  if (sugarPer100g === undefined) {
    sugarColor = "gray";
    sugarLevel = "Şeker bilgisi yok";
  } else if (sugarPer100g <= 5) {
    sugarColor = "green";
    sugarLevel = "Düşük şekerli";
  } else if (sugarPer100g <= 22.5) {
    sugarColor = "orange";
    sugarLevel = "Orta düzeyde şekerli";
  } else {
    sugarColor = "red";
    sugarLevel = "Yüksek şekerli";
  }

  let gradeText = "";
  let gradeColor = "";

  switch (grade) {
    case "a":
      gradeText = "Çok sağlıklı";
      gradeColor = "green";
      break;
    case "b":
      gradeText = "Sağlıklı";
      gradeColor = "#66bb6a";
      break;
    case "c":
      gradeText = "Orta";
      gradeColor = "orange";
      break;
    case "d":
      gradeText = "Sağlıksız";
      gradeColor = "#e57373";
      break;
    case "e":
      gradeText = "Çok sağlıksız";
      gradeColor = "red";
      break;
    default:
      gradeText = "Bilinmiyor";
      gradeColor = "gray";
  }

  const [visible, setVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoKey, setInfoKey] = useState("");
  const imageUrl = product.image_front_url;

  return (
    <PaperProvider>
      <View style={{ padding: wp("5%") }} className="flex-1 bg-[#fffaef]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            style={{
              paddingVertical: wp("2%"),
              position: "absolute",
              top: wp("4%"),
              right: wp("2%"),
            }}
          >
            <Entypo name="circle-with-cross" size={34} color="black" />
          </Pressable>
          <Text
            style={{
              fontSize: 25,
              fontStyle: "italic",
              fontWeight: "700",
              alignSelf: "center",
              marginTop: wp("7%"),
            }}
          >
            {product.product_name}
          </Text>

          <Text className="self-center">
            {product.nutriments["energy-kcal"]} kcal
          </Text>
          <View
            style={{
              padding: wp("4%"),
            }}
            className="flex-row items-center justify-center"
          >
            <Image
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../assets/placeHolderImage.png")
              }
              style={{ width: 250, height: 250 }}
            />
            <View
              style={{ position: "absolute", top: wp("1%"), right: wp("1%") }}
            >
              <Pressable
                onPress={handleFavoritePress}
                style={{ paddingVertical: wp("2%") }}
              >
                <AntDesign
                  name={favoritePress ? "heart" : "hearto"}
                  size={30}
                  color={favoritePress ? "#d62d2d" : "black"}
                />
              </Pressable>
              <Pressable style={{ paddingVertical: wp("2%") }}>
                <Ionicons name="add-circle-outline" size={34} color="black" />
              </Pressable>
            </View>
          </View>

          <View
            style={{ marginTop: wp("1%"), marginBottom: wp("8%") }}
            className="flex-row justify-around items-center"
          >
            <View className="justify-center items-center">
              <Text>Miktar (g):</Text>
              <Text className="font-light text-sm">
                (Tükettiğiniz miktarı girin!)
              </Text>
            </View>

            <TextInput
              mode="outlined"
              value={amount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue) || numericValue <= 100) {
                  setAmount(text);
                }
              }}
              placeholder={amount}
              keyboardType="numeric"
              style={{
                backgroundColor: "#fffaef",
                borderRadius: 8,
                fontSize: 14,
                height: wp("8%"),
                width: wp("35%"),
              }}
              outlineColor="#52c46f"
              activeOutlineColor="#388e3c"
              right={<TextInput.Icon icon="pencil" color="#388e3c" />}
            />
          </View>
          {/* 
          <Nutriments product={product} amount={amount} />
          <HealthInfo product={product} />
          <ExtraInfo product={product} /> */}

          <Pressable onPress={() => setVisible(true)}>
            <Text
              style={{ padding: wp("4%") }}
              className="underline   text-xl self-center"
            >
              İçindekiler
            </Text>
          </Pressable>

          <MyModal
            visible={visible}
            closeModal={() => setVisible(false)}
            modalText={ingredientsText}
            title="İçindekiler"
          />
        </ScrollView>
      </View>
    </PaperProvider>
  );
}
