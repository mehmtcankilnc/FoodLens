import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MyModal from "../components/MyModal";
import { PaperProvider, TextInput } from "react-native-paper";
import InfoModal from "../components/InfoModal";
import { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ExtraInfo from "../components/extraInfo";

export default function ProductDetail({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();

  const [amount, setAmount] = useState("100");

  const nutriments = useMemo(() => {
    const parsedAmount = parseFloat(amount);
    const ratio = isNaN(parsedAmount) ? 1 : parsedAmount / 100;

    return [
      {
        name: "Karbonhidrat",
        value: ((product.nutriments.carbohydrates || 0) * ratio).toFixed(1),
        iconName: "bread-slice",
        fc: "#ffb49c",
        sc: "#ff7a1b",
      },
      {
        name: "Yağ",
        value: ((product.nutriments.fat || 0) * ratio).toFixed(1),
        iconName: "droplet",
        fc: "#f7f296",
        sc: "#ffda03",
      },
      {
        name: "Protein",
        value: ((product.nutriments.proteins || 0) * ratio).toFixed(1),
        iconName: "fish",
        fc: "#bcdceb",
        sc: "#5e8aed",
      },
      {
        name: "Şeker",
        value: ((product.nutriments.sugars || 0) * ratio).toFixed(1),
        iconName: "candy-cane",
        fc: "#f6c2d8",
        sc: "#ef6ea6",
      },
      {
        name: "Lif",
        value: ((product.nutriments.fiber || 0) * ratio).toFixed(1),
        iconName: "leaf",
        fc: "#b7edbb",
        sc: "#52c46f",
      },
      {
        name: "Doymuş Yağ",
        value: ((product.nutriments["saturated-fat"] || 0) * ratio).toFixed(1),
        iconName: "droplet-slash",
        fc: "#d7c3f8",
        sc: "#bf9add",
      },
    ];
  }, [amount, product]);

  const [showAll, setShowAll] = useState(false);

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
              <Pressable style={{ paddingVertical: wp("2%") }}>
                <MaterialIcons name="favorite-border" size={34} color="black" />
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

          <Text className="font-bold text-3xl self-center">
            Enerji Değerleri
          </Text>
          <View
            style={{
              marginVertical: wp("4%"),
              padding: wp("4%"),
              elevation: 4,
              backgroundColor: "#fffaf0",
            }}
          >
            {(showAll ? nutriments : nutriments.slice(0, 3)).map(
              (item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: wp("4%"),
                  }}
                >
                  {/* Üst Satır: İkon + Ad + % */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: wp("1%"),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: wp("2%"),
                      }}
                    >
                      <FontAwesome6
                        name={item.iconName}
                        size={20}
                        color={item.sc}
                      />
                      <Text style={{ fontSize: wp("4%"), fontWeight: "500" }}>
                        {item.name}
                      </Text>
                    </View>
                    <Text style={{ fontSize: wp("3.5%"), color: "#555" }}>
                      %{item.value}
                    </Text>
                  </View>

                  {/* Bar */}
                  <View
                    style={{
                      height: wp("4%"),
                      width: "100%",
                      backgroundColor: item.fc,
                      borderRadius: wp("2%"),
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: `${item.value}%`,
                        backgroundColor: item.sc,
                        borderRadius: wp("2%"),
                      }}
                    />
                  </View>
                </View>
              )
            )}

            {/* Daha fazla göster */}
            <Pressable
              onPress={() => setShowAll(!showAll)}
              style={{ alignItems: "flex-end" }}
            >
              <Text
                style={{
                  color: "#388e3c",
                  fontSize: wp("3.5%"),
                  textDecorationLine: "underline",
                  fontWeight: "500",
                }}
              >
                {showAll ? "Daha Az Göster" : "Daha Fazla Göster"}
              </Text>
            </Pressable>
          </View>

          <View
            className="justify-center items-center flex-row"
            style={{ margin: wp("8%"), gap: wp("5%") }}
          >
            <Pressable
              onPress={() => {
                setInfoModalVisible(true);
                setInfoKey("palm");
              }}
              style={{
                width: wp("20%"),
                height: wp("20%"),
                elevation: 7,
              }}
              className="justify-center items-center  bg-[#fffaf0] rounded-xl"
            >
              <MaterialCommunityIcons
                name="palm-tree"
                size={45}
                color={palmColor}
              />
              <Text
                numberOfLines={6}
                style={{
                  maxWidth: wp("50%"),
                  fontSize: 10,
                }}
              >
                {palmText}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setInfoModalVisible(true);
                setInfoKey("sugar");
              }}
              style={{
                width: wp("20%"),
                height: wp("20%"),
                elevation: 7,
              }}
              className="justify-center items-center bg-[#fffaf0] rounded-xl "
            >
              <MaterialCommunityIcons
                name="candy"
                size={45}
                color={sugarColor}
              />
              <Text
                numberOfLines={6}
                style={{
                  maxWidth: wp("50%"),
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                {sugarLevel}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setInfoModalVisible(true);
                setInfoKey("nutri");
              }}
              style={{
                width: wp("20%"),
                height: wp("20%"),
                elevation: 7,
              }}
              className="justify-center items-center bg-[#fffaf0] rounded-xl "
            >
              <FontAwesome6 name="nutritionix" size={45} color={gradeColor} />
              <Text
                numberOfLines={6}
                style={{
                  maxWidth: wp("50%"),
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                {gradeText}
              </Text>
            </Pressable>
            <InfoModal
              visible={infoModalVisible}
              closeModal={() => setInfoModalVisible(false)}
              infoKey={infoKey}
            />
          </View>

          <MyModal
            visible={visible}
            closeModal={() => setVisible(false)}
            modalText={ingredientsText}
            title="İçindekiler"
          />

          <ExtraInfo product={product} />
          <Pressable onPress={() => setVisible(true)}>
            <Text
              style={{ padding: wp("4%") }}
              className="underline   text-xl self-center"
            >
              İçindekiler
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}
