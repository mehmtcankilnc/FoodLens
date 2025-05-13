import { View, Text, Pressable } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import InfoModal from "../components/InfoModal";

export default function HealthInfo({ product }) {
  return (
    <View
      className="justify-center items-center flex-row"
      style={{ margin: wp("8%"), gap: wp("5%") }}
    >
      <Pressable
        onPress={() => {
          setInfoModalVisible(true);
          setInfoKey("palm");
        }}
        style={{
          width: wp("20%"),
          height: wp("20%"),
          elevation: 7,
        }}
        className="justify-center items-center  bg-[#fffaf0] rounded-xl"
      >
        <MaterialCommunityIcons name="palm-tree" size={45} color={palmColor} />
        <Text
          numberOfLines={6}
          style={{
            maxWidth: wp("50%"),
            fontSize: 10,
          }}
        >
          {palmText}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setInfoModalVisible(true);
          setInfoKey("sugar");
        }}
        style={{
          width: wp("20%"),
          height: wp("20%"),
          elevation: 7,
        }}
        className="justify-center items-center bg-[#fffaf0] rounded-xl "
      >
        <MaterialCommunityIcons name="candy" size={45} color={sugarColor} />
        <Text
          numberOfLines={6}
          style={{
            maxWidth: wp("50%"),
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {sugarLevel}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setInfoModalVisible(true);
          setInfoKey("nutri");
        }}
        style={{
          width: wp("20%"),
          height: wp("20%"),
          elevation: 7,
        }}
        className="justify-center items-center bg-[#fffaf0] rounded-xl "
      >
        <FontAwesome6 name="nutritionix" size={45} color={gradeColor} />
        <Text
          numberOfLines={6}
          style={{
            maxWidth: wp("50%"),
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {gradeText}
        </Text>
      </Pressable>
      <InfoModal
        visible={infoModalVisible}
        closeModal={() => setInfoModalVisible(false)}
        infoKey={infoKey}
      />
    </View>
  );
}
