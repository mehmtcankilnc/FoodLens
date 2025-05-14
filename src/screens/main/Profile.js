import { View, Text, Image, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useUser, useClerk } from "@clerk/clerk-expo";
import GoalModal from "../../components/GoalModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isMounted, setIsMounted] = useState(false);
  const [goalModalVisibility, setGoalModalVisibility] = useState(false);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 170,
    carbs: 270,
    fat: 48,
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !user) return null;

  const handleSave = (newGoals) => {
    setGoals(newGoals);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ padding: wp("3%"), gap: hp("1%") }}
      className="flex-1 bg-[#f8f8f8]"
    >
      <View className="flex-row items-center" style={{ gap: wp("3%") }}>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 75, height: 75, borderRadius: 9999 }}
        />
        <View style={{ gap: wp("1%") }}>
          <Text className="font-bold text-xl capitalize">{user.fullName}</Text>
          <Text className="font-medium text-[gray] italic">
            {user.emailAddresses[0].emailAddress}
          </Text>
        </View>
      </View>
      <Text style={{ marginTop: wp("2%") }} className="text-lg italic">
        Kişisel Hedefler
      </Text>
      <View style={{ gap: wp("2%"), padding: wp("2%") }}>
        <View className="flex-row" style={{ gap: wp("2%") }}>
          <View
            style={{ padding: wp("2%") }}
            className="flex-1 flex-row justify-between items-center bg-[#b5b5b5] rounded-md "
          >
            <Text className="font-semibold text-lg">Kalori Hedefi</Text>
            <Text className="font-medium text-lg italic">
              {goals.calories} kcal
            </Text>
          </View>
          <Pressable
            onPress={() => setGoalModalVisibility(true)}
            style={{ padding: wp("2%") }}
            className="flex rounded-md bg-[#b5b5b5]"
          >
            <MaterialCommunityIcons
              name="lead-pencil"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View className="flex-row" style={{ gap: wp("2%") }}>
          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center bg-[#bcdceb] rounded-md "
          >
            <Text numberOfLines={1} className="font-semibold text-lg">
              Protein
            </Text>
            <Text className="font-medium text-lg italic">
              {goals.protein} g
            </Text>
          </View>
          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center bg-[#ffa789] rounded-md "
          >
            <Text numberOfLines={1} className="font-semibold text-lg">
              Karbonhidrat
            </Text>
            <Text className="font-medium text-lg italic">{goals.carbs} g</Text>
          </View>
          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center bg-[#f7f296] rounded-md "
          >
            <Text numberOfLines={1} className="font-semibold text-lg">
              Yağ
            </Text>
            <Text className="font-medium text-lg italic">{goals.fat} g</Text>
          </View>
        </View>
      </View>
      <Text style={{ marginTop: wp("2%") }} className="text-lg italic">
        Kişisel Bilgiler
      </Text>
      <View style={{ gap: wp("4%"), padding: wp("2%") }}>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <AntDesign name="user" size={24} color="black" />
            <Text className="font-bold text-lg">Ad Soyad</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text className="font-bold text-lg">E-Posta</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text className="font-bold text-lg">Şifre Değiştir</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={handleSignOut}
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={24}
              color="black"
            />
            <Text className="font-bold text-lg">Çıkış Yap</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <AntDesign name="delete" size={24} color="black" />
            <Text className="font-bold text-lg">Hesabı Sil</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
      </View>
      {goalModalVisibility && (
        <GoalModal
          visible={goalModalVisibility}
          closeModal={() => setGoalModalVisibility(false)}
          saveData={handleSave}
          goals={goals}
        />
      )}
    </View>
  );
}
