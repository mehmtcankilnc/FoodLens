import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import VerificationCodeInput from "../../components/VerificationCodeInput";

export default function Verification({ handleVerify }) {
  const navigation = useNavigation();
  const [code, setCode] = useState("");

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ gap: hp("4%") }}
    >
      <Pressable
        style={{ position: "absolute", top: hp("10%"), left: wp("7%") }}
        onPress={() => navigation.replace("Login")}
      >
        <AntDesign name="back" size={36} color="black" />
      </Pressable>
      <Text
        style={{ position: "absolute", top: hp("11%") }}
        className="font-bold text-2xl text-center"
      >
        E-Postanı onayla
      </Text>
      <Image
        source={require("../../assets/confirm.png")}
        style={{ width: wp("50%"), height: hp("30%") }}
      />
      <Text className="font-medium text-center" style={{ width: wp("70%") }}>
        Lütfen e-postanıza gelen doğrulama kodunu girin
      </Text>
      <VerificationCodeInput value={code} setValue={setCode} />
      <Pressable
        className="bg-[#b7edbb] justify-center rounded-xl"
        style={{ width: wp("75%"), height: hp("6%") }}
        onPress={() => handleVerify(code)}
      >
        <Text className="text-center font-bold text-xl">Onayla</Text>
      </Pressable>
    </View>
  );
}
