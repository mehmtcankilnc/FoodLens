import { View, FlatList, Pressable, Text, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { OnboardingData } from "../../data/OnboardingData";
import OnboardingItem from "../../components/OnboardingItem";
import Paginator from "../../components/Paginator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View className="flex-1 bg-[#f8f8f8] items-center">
      <FlatList
        data={OnboardingData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <View className="items-center" style={{ marginBottom: hp("10%") }}>
        <Paginator data={OnboardingData} scrollX={scrollX} />
        <Pressable
          className="bg-[#3f6942] justify-center rounded-full"
          style={{ width: wp("25%"), height: hp("6%"), marginBottom: hp("2%") }}
          onPress={() => navigation.replace("Login")}
        >
          <Text className="text-center font-bold text-xl text-white">Atla</Text>
        </Pressable>
      </View>
    </View>
  );
}
