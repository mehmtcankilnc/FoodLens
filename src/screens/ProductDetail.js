import { View, Text } from "react-native";
import React from "react";

export default function ProductDetail({ route }) {
  const { product } = route.params;

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl">{product.product_name}</Text>
    </View>
  );
}
