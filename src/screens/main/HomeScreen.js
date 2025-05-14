import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFavorites } from "../../hooks/useFavorites";
import ConsumedList from "../../components/consumedCard";
import { useAuth } from "@clerk/clerk-expo";
import { cleanOldConsumed } from "../../services/consumedService";
import FavoriteCard from "../../components/favoriteCard";
import ProgressBar from "../../components/progressBar";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  return (
    <View style={{ padding: wp("3%") }} className="flex-1 bg-[#f8f8f8]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp("10%") }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-bold text-2xl">Günlük Besin Durumu</Text>
        <ProgressBar />

        <View style={{ gap: hp("2%"), marginTop: hp("3%") }}>
          <Text className="font-bold text-2xl">Favoriler</Text>
          {favorites.length === 0 ? (
            <View className="items-center justify-center">
              <Image
                source={require("../../assets/emptyFavorites.png")}
                style={{
                  width: wp("25%"),
                  height: wp("25%"),
                  resizeMode: "contain",
                }}
              />
              <Text className="font-semibold text-base">Henüz favori yok</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row" style={{ gap: wp("4%") }}>
                {favorites.map((item) => (
                  <FavoriteCard
                    key={item.id}
                    barcode={item.barcode}
                    name={item.name}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        <ConsumedList />
      </ScrollView>
    </View>
  );
}
