import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useConsumedToday } from "../hooks/useConsumedToday";
import { removeFromConsumed } from "../services/consumedService";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ConsumedList() {
  const consumed = useConsumedToday();
  const { userId } = useAuth();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Bugün Tüketilenler
      </Text>

      {consumed && consumed.length > 0 ? (
        <ScrollView
          style={{
            maxHeight: hp("40%"), // Yaklaşık 5 ürünlük yer kaplasın
          }}
          showsVerticalScrollIndicator={false}
        >
          {consumed.map((item) => (
            <View
              key={item.barcode}
              style={{
                marginBottom: wp("2%"),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                elevation: 2,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: wp("3%"),
              }}
            >
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <Pressable
                onPress={() => removeFromConsumed(userId, item.barcode)}
              >
                <Ionicons name="trash-outline" size={24} color="black" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ alignItems: "center", marginTop: wp("4%") }}>
          <Image
            source={require("../assets/noFood.png")}
            style={{ width: 200, height: 200, marginBottom: 10 }}
            resizeMode="contain"
          />
          <Text style={{ color: "black", fontSize: 16 }}>
            No Food Consumed Today
          </Text>
        </View>
      )}
    </View>
  );
}
