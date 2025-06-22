import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function OnboardingItem({ item }) {
  return (
    <View
      className="bg-[#f8f8f8] justify-center items-center"
      style={{ width: wp("100%"), height: hp("100%") }}
    >
      <Text
        className="text-center font-bold text-3xl italic"
        style={{ width: wp("85%") }}
      >
        {item.title}
      </Text>
      <Image
        source={item.image}
        style={{ width: wp("60%"), height: hp("30%") }}
      />
      <View className="items-center" style={{ gap: wp("5%") }}>
        <Text
          className="text-center font-semibold text-xl color-[green]"
          style={{ width: wp("85%") }}
        >
          {item.text}
        </Text>
        <Text
          className="text-center font-medium text-base"
          style={{ width: wp("85%"), marginBottom: hp("5%") }}
        >
          {item.subText}
        </Text>
      </View>
    </View>
  );
}
