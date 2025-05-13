import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import InfoModal from "../InfoModal";

export default function HealthInfo({ product }) {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoKey, setInfoKey] = useState("");
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
  return (
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
        <MaterialCommunityIcons name="palm-tree" size={45} color={palmColor} />
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
        <MaterialCommunityIcons name="candy" size={45} color={sugarColor} />
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
  );
}
