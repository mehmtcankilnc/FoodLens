import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMemo } from "react";

export default function Nutriments({ product, amount }) {
  const [showAll, setShowAll] = useState(false);
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
  return (
    <View>
      <Text className="font-bold text-3xl self-center">Enerji Değerleri</Text>
      <View
        style={{
          marginVertical: wp("4%"),
          padding: wp("4%"),
          elevation: 4,
          backgroundColor: "#fffaf0",
        }}
      >
        {(showAll ? nutriments : nutriments.slice(0, 3)).map((item, index) => (
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
                <FontAwesome6 name={item.iconName} size={20} color={item.sc} />
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
        ))}

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
    </View>
  );
}
