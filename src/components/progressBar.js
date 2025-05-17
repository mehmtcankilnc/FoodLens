import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useConsumedToday } from "../hooks/useConsumedToday";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export default function ProgressBar() {
  const consumed = useConsumedToday();

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  useEffect(() => {
    let calories = 0;
    let carbs = 0;
    let proteins = 0;
    let fat = 0;

    consumed.forEach((item) => {
      const n = item.nutriments;
      calories += n?.["energy-kcal_serving"] || 0;
      carbs += n?.carbohydrates_serving || 0;
      proteins += n?.proteins_serving || 0;
      fat += n?.fat_serving || 0;
    });

    setTotalCalories(calories);
    setTotalCarbs(carbs);
    setTotalProteins(proteins);
    setTotalFat(fat);
  }, [consumed]);

  return (
    <View
      style={{
        flex: 1,
        padding: wp("3%"),
        alignItems: "center",
        gap: hp("3%"),
      }}
    >
      {/* Kalori */}
      <View
        style={{
          padding: wp("3%"),
          elevation: 4,
          backgroundColor: "white",
          borderColor: "ccc",
          borderRadius: 7,
        }}
        className="w-full flex-row justify-between items-center"
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {2000 - Math.round(totalCalories)} kcal
          </Text>
          <Text style={{ color: "#888" }}>Kalan Kalori</Text>
        </View>
        <AnimatedCircularProgress
          size={160}
          width={14}
          fill={(totalCalories / 2000) * 100}
          tintColor="black"
          backgroundColor="#EDEDED"
          rotation={0}
          lineCap="round"
        >
          {(fill) => (
            <View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {Math.round(totalCalories)} kcal
                </Text>
                <Text style={{ color: "#888", fontSize: 10 }}>
                  Tüketilen Kalori
                </Text>
              </View>
              <Ionicons
                className="self-center mt-3"
                name="flame-sharp"
                size={40}
                color="black"
              />
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      {/* Makrolar */}
      <View
        style={{
          flexDirection: "row",
          gap: wp("2%"),
        }}
      >
        {/* Karbonhidrat */}
        <View
          style={{
            flex: 1,
            padding: wp("3%"),
            elevation: 4,
            backgroundColor: "white",
            borderColor: "ccc",
            borderRadius: 7,
            alignItems: "center",
            gap: wp("2"),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {Math.round(totalCarbs)}/300g
            </Text>
            <Text style={{ fontSize: 12 }}>Karbonhidrat</Text>
          </View>
          <AnimatedCircularProgress
            size={90}
            width={10}
            fill={(totalCarbs / 300) * 100}
            tintColor="#ff6a00"
            backgroundColor="#ffb49c"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <MaterialCommunityIcons
                name="bread-slice-outline"
                size={24}
                color="black"
              />
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Protein */}
        <View
          style={{
            flex: 1,
            padding: wp("3%"),
            elevation: 4,
            backgroundColor: "white",
            borderColor: "ccc",
            borderRadius: 7,
            alignItems: "center",
            gap: wp("2"),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {Math.round(totalProteins)}/50g
            </Text>
            <Text style={{ fontSize: 12 }}>Protein</Text>
          </View>
          <AnimatedCircularProgress
            size={90}
            width={10}
            fill={(totalProteins / 50) * 100}
            tintColor="#5E8AED"
            backgroundColor="#D6E4FB"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <MaterialCommunityIcons
                name="food-steak"
                size={24}
                color="black"
              />
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Yağ */}
        <View
          style={{
            flex: 1,
            padding: wp("3%"),
            elevation: 4,
            backgroundColor: "white",
            borderColor: "ccc",
            borderRadius: 7,
            alignItems: "center",
            gap: wp("2"),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {Math.round(totalFat)}/70g
            </Text>
            <Text style={{ fontSize: 12 }}>Yağ</Text>
          </View>
          <AnimatedCircularProgress
            size={90}
            width={10}
            fill={(totalFat / 70) * 100}
            tintColor="#FFD700"
            backgroundColor="#FFF7C2"
            rotation={0}
            lineCap="round"
          >
            {() => <Feather name="droplet" size={24} color="black" />}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
}
