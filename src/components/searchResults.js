import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Modal, Portal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { cleanOldConsumed, addToConsumed } from "../services/consumedService";
import { useAuth } from "@clerk/clerk-expo";
import { useConsumedToday } from "../hooks/useConsumedToday";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SearchResults({
  visible,
  onDismiss,
  filteredProducts,
}) {
  const consumedToday = useConsumedToday();
  const { userId } = useAuth();
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

  const handleAddToConsumed = (item) => {
    const alreadyConsumed = consumedToday.some(
      (consumedItem) =>
        consumedItem.barcode === (item.barcode || item.id || item.name)
    );
    if (alreadyConsumed) return;

    const formattedItem = {
      id: item.barcode || item.id || item.name,
      barcode: item.barcode || item.id || item.name,
      product_name: item.name,
      nutriments: {
        "energy-kcal_serving": parseFloat(item.calories) || 0,
        carbohydrates_serving: parseFloat(item.carbs) || 0,
        proteins_serving: parseFloat(item.protein) || 0,
        fat_serving: parseFloat(item.fat) || 0,
      },
    };

    const gram = 100;
    const adet = 1;
    const oran = (gram * adet) / 100;

    const scaledNutriments = {};
    for (let key in formattedItem.nutriments) {
      const value = parseFloat(formattedItem.nutriments[key]);
      scaledNutriments[key] = isNaN(value)
        ? 0
        : parseFloat((value * oran).toFixed(2)); // DÜZELTİLEN KISIM
    }

    const updatedProduct = {
      ...formattedItem,
      nutriments: scaledNutriments,
      consumed_amount: gram,
      consumed_piece: adet,
    };

    addToConsumed(userId, updatedProduct);
    onDismiss(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => onDismiss(false)}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 12,
          alignSelf: "center",
          maxHeight: hp("80%"),
        }}
      >
        {filteredProducts.length > 0 && (
          <ScrollView
            style={{ width: wp("80%") }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Arama Sonuçları
            </Text>
            {filteredProducts.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                }}
              >
                <View className="flex-row items-center">
                  <Text style={{ fontWeight: "bold", marginRight: wp("4%") }}>
                    {item.name}
                  </Text>
                  <MaterialIcons
                    name="local-fire-department"
                    size={20}
                    color="black"
                  />
                  <Text> {item.calories}</Text>
                </View>
                <Text>Miktar: {item.amount}</Text>
                <View className="flex-row items-center justify-between">
                  <Text>Yağ: {item.fat}</Text>
                  <Text>Karb: {item.carbs}</Text>
                  <Text>Protein: {item.protein}</Text>
                </View>
                <Pressable
                  onPress={() => handleAddToConsumed(item)}
                  style={{
                    marginTop: 8,
                    padding: 6,
                    backgroundColor: "#d9ebd3",
                    borderRadius: 8,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    Tükettiklerime Ekle
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </Modal>
    </Portal>
  );
}
