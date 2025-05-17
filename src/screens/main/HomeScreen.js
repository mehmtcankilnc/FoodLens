import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFavorites } from "../../hooks/useFavorites";
import ConsumedList from "../../components/consumedCard";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { cleanOldConsumed } from "../../services/consumedService";
import FavoriteCard from "../../components/favoriteCard";
import ProgressBar from "../../components/progressBar";

export default function HomeScreen() {
  const favorites = useFavorites();
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (userId) {
      cleanOldConsumed(userId);
    }
  }, [userId]);

  return (
    <View style={{ padding: wp("3%") }} className="flex-1 bg-[#f8f8f8]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp("5%") }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ paddingVertical: wp("4%") }}
          className="font-bold text-3xl text-[#3f6942]"
        >
          Merhaba, {user?.firstName}!
        </Text>
        <Text className="font-medium text-xl italic">Günlük Besin Durumu</Text>
        <ProgressBar />
        <ConsumedList />
        <View style={{ gap: hp("2%"), marginTop: hp("3%") }}>
          <Text className="font-medium text-xl italic">Favoriler</Text>
          {favorites.length === 0 ? (
            <View
              className="items-center justify-center"
              style={{ padding: wp("3%") }}
            >
              <Image
                source={require("../../assets/heartIcon.png")}
                style={{
                  width: wp("25%"),
                  height: wp("25%"),
                  resizeMode: "contain",
                }}
              />
              <Text className="text-base">Henüz Favori Yok</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ padding: wp("3%") }}
            >
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
      </ScrollView>
    </View>
  );
}
