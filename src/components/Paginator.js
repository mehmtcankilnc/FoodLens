import { View, StyleSheet, Animated } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Paginator({ data, scrollX }) {
  return (
    <View className="flex-row" style={{ height: hp("8%") }}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * wp("100%"),
          index * wp("100%"),
          (index + 1) * wp("100%"),
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: hp("1.3%"),
    borderRadius: 5,
    backgroundColor: "green",
    marginHorizontal: wp("2%"),
  },
});
