import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";

import MyModal from "../components/MyModal";
import { PaperProvider, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExtraInfo from "../components/productDetail/extraInfo";
import Nutriments from "../components/productDetail/nutriments";
import HealthInfo from "../components/productDetail/healthInfo";
import { addFavorite, removeFavorite } from "../services/favoriteServices";
import { useAuth } from "@clerk/clerk-expo";
import { useFavorites } from "../hooks/useFavorites";
import { addToConsumed } from "../services/consumedService";
import { useConsumedToday } from "../hooks/useConsumedToday";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetail({ route }) {
  const navigation = useNavigation();
  const { userId } = useAuth();
  const { product } = route.params;
  const [amount, setAmount] = useState("100");
  const [piece, setPiece] = useState("1");
  const [favoritePress, setFavoritePress] = useState(false);
  const [addPress, setAddPress] = useState(false);
  const ingredientsText = product.ingredients_text?.toLowerCase();

  const consumed = useConsumedToday();
  const favorites = useFavorites();
  useEffect(() => {
    const isFav = favorites.some((item) => item.barcode === product.id);
    setFavoritePress(isFav);

    const isCons = consumed.some((item) => item.barcode === product.id);
    setAddPress(isCons);
  }, [favorites, product.id, consumed]);

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

  const handleAddPress = () => {
    setAddPress((prev) => !prev);

    if (addPress === false) {
      const gram = parseFloat(amount) || 100;
      const adet = parseInt(piece) || 1;
      const oran = (gram * adet) / 100;

      const scaledNutriments = {};
      for (let key in product.nutriments) {
        const value = parseFloat(product.nutriments[key]);
        scaledNutriments[key] = isNaN(value)
          ? product.nutriments[key]
          : (value * oran).toFixed(2);
      }

      const updatedProduct = {
        ...product,
        nutriments: scaledNutriments,
        consumed_amount: gram,
        consumed_piece: adet,
      };

      addToConsumed(userId, updatedProduct);
      navigation.navigate("MainTabs");
    } else {
      const existing = consumed.find((item) => item.barcode === product.id);
      removeFavorite(userId, existing.id);
    }
  };

  const [visible, setVisible] = useState(false);
  const imageUrl = product.image_front_url;

  return (
    <PaperProvider>
      <View
        style={{ padding: wp("5%"), marginBottom: wp("4%") }}
        className="flex-1 bg-[#f8f8f8]"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => navigation.navigate("MainTabs")}
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

          <Text className="self-center italic">
            {product.nutriments["energy-kcal"]} kcal
          </Text>

          <View
            style={{ padding: wp("4%") }}
            className="flex-row items-center justify-center"
          >
            <Image
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../assets/placeHolderImage.png")
              }
              style={{
                width: 225,
                height: 225,
                borderRadius: 12,
                borderColor: "black",
                borderWidth: 2,
              }}
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
              <Pressable
                onPress={handleAddPress}
                style={{ paddingVertical: wp("2%") }}
              >
                <Ionicons
                  name={
                    addPress ? "remove-circle-outline" : "add-circle-outline"
                  }
                  size={34}
                  color="black"
                />
              </Pressable>
            </View>
          </View>

          <View
            style={{ marginTop: wp("1%"), marginBottom: wp("8%") }}
            className="items-center gap-y-2"
          >
            <Text>Miktar (g):</Text>
            <TextInput
              mode="outlined"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              placeholder={amount}
              keyboardType="numeric"
              style={{
                backgroundColor: "#f8f8f8",
                borderRadius: 8,
                fontSize: 14,
                height: wp("8%"),
                width: wp("35%"),
              }}
              outlineColor="black"
              activeOutlineColor="black"
              right={<TextInput.Icon icon="pencil" color="black" />}
            />

            <Text>Ürün Adedi:</Text>
            <TextInput
              mode="outlined"
              value={piece}
              onChangeText={(text) => setPiece(text)}
              keyboardType="numeric"
              style={{
                backgroundColor: "#f8f8f8",
                borderRadius: 8,
                fontSize: 14,
                height: wp("8%"),
                width: wp("35%"),
              }}
              outlineColor="black"
              activeOutlineColor="black"
              right={<TextInput.Icon icon="plus" color="black" />}
            />
          </View>

          <Nutriments product={product} amount={amount} piece={piece} />
          <HealthInfo product={product} />
          <ExtraInfo product={product} />

          <Pressable onPress={() => setVisible(true)}>
            <Text
              style={{ padding: wp("4%") }}
              className="underline text-xl self-center"
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
