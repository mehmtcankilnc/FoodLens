import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useAuth } from "@clerk/clerk-expo";
import { useWeeklyConsumed } from "../hooks/useWeeklyConsumed";

export default function WeeklyMacroChart() {
  const { userId } = useAuth();
  const rawData = useWeeklyConsumed(userId);

  if (!rawData || rawData.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Veri bulunamadı.
      </Text>
    );
  }

  const safeData = rawData.map((item) => ({
    date: item.date?.slice(5) || "??-??",
    calories: isFinite(item.calories) ? item.calories : 0,
    carbs: isFinite(item.carbs) ? item.carbs : 0,
    proteins: isFinite(item.proteins) ? item.proteins : 0,
    fat: isFinite(item.fat) ? item.fat : 0,
  }));

  const labels = safeData.map((item) => item.date);
  const calories = safeData.map((item) => item.calories);
  const carbs = safeData.map((item) => item.carbs);
  const proteins = safeData.map((item) => item.proteins);
  const fat = safeData.map((item) => item.fat);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 6,
        }}
      >
        <Text style={{ color: "black" }}>⬤ Kalori</Text>
        <Text style={{ color: "#ff6a00" }}>⬤ Karbonhidrat</Text>
        <Text style={{ color: "#5E8AED" }}>⬤ Protein</Text>
        <Text style={{ color: "#FFD700" }}>⬤ Yağ</Text>
      </View>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: calories,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: carbs,
              color: (opacity = 1) => `rgba(255, 106, 0, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: proteins,
              color: (opacity = 1) => `rgba(94, 138, 237, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: fat,
              color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: [],
        }}
        width={Dimensions.get("window").width - 20}
        height={250}
        yAxisSuffix="g"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => `black`,
          labelColor: () => "#333",
          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#000",
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16,
          alignSelf: "center",
        }}
      />
    </View>
  );
}
