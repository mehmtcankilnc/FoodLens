import { View, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ExtraInfo({ product }) {
  return (
    <View
      style={{
        backgroundColor: "#fffaf0",
        paddingVertical: wp("4%"),
        paddingHorizontal: wp("5%"),
        borderRadius: wp("3%"),
        gap: wp("3%"),
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }}
    >
      <Text className="text-lg font-semibold">
        Ambalaj ve Dağıtım Bilgileri
      </Text>
      {[
        {
          icon: <AntDesign name="trademark" size={20} color="black" />,
          label: "Marka",
          value: product.brands || "Belirtilmemiş",
        },
        {
          icon: <AntDesign name="tagso" size={20} color="black" />,
          label: "Etiketler",
          value: product.labels_tags?.join(", ") || "Belirtilmemiş",
        },
        {
          icon: <Feather name="package" size={20} color="black" />,
          label: "Ambalaj",
          value: product.packaging || "Belirtilmemiş",
        },
        {
          icon: <MaterialIcons name="factory" size={20} color="black" />,
          label: "Üretim Yeri",
          value:
            product.manufacturing_places_tags?.join(", ") || "Belirtilmemiş",
        },
        {
          icon: <AntDesign name="earth" size={20} color="black" />,
          label: "Satıldığı Ülkeler",
          value:
            product.countries_tags
              ?.map((c) => c.replace("en:", ""))
              .join(", ") || "Belirtilmemiş",
        },
        {
          icon: <Ionicons name="storefront-outline" size={20} color="black" />,
          label: "Mağazalar",
          value: product.stores_tags?.join(", ") || "Belirtilmemiş",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="scale-bathroom"
              size={20}
              color="black"
            />
          ),
          label: "Miktar",
          value: product.quantity || "Belirtilmemiş",
        },
      ].map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: wp("2%"),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: wp("35%"),
              gap: wp("2%"),
            }}
          >
            {item.icon}
            <Text
              style={{
                fontSize: wp("3.6%"),
                fontWeight: "600",
                color: "#333",
              }}
            >
              {item.label}:
            </Text>
          </View>
          <Text
            style={{
              flex: 1,
              fontSize: wp("3.6%"),
              color: "#555",
            }}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
