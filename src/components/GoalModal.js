import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Modal, Portal, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function GoalModal({ visible, closeModal, saveData, goals }) {
  const [calories, setCalories] = useState(goals.calories);
  const [protein, setProtein] = useState(goals.protein);
  const [carbs, setCarbs] = useState(goals.carbs);
  const [fat, setFat] = useState(goals.fat);

  useEffect(() => {
    if (visible) {
      setCalories(goals.calories);
      setProtein(goals.protein);
      setCarbs(goals.carbs);
      setFat(goals.fat);
    }
  }, [visible]);

  const handleSave = () => {
    saveData({ calories, protein, carbs, fat });
    closeModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: wp("5%"),
          margin: wp("5%"),
          paddingVertical: hp("5%"),
          borderRadius: 10,
        }}
      >
        <Pressable
          onPress={closeModal}
          style={{ position: "absolute", top: wp("3%"), right: wp("3%") }}
        >
          <Entypo name="circle-with-cross" size={24} color="black" />
        </Pressable>
        <View className="items-center" style={{ gap: wp("3%") }}>
          <TextInput
            label="Kalori"
            mode="outlined"
            dense
            autoCapitalize="none"
            value={calories}
            onChangeText={(calories) => setCalories(calories)}
            style={{
              width: wp("80%"),
              height: hp("6%"),
              backgroundColor: "#f8f8f8",
            }}
            outlineColor="black"
            activeOutlineColor="black"
            keyboardType="numeric"
          />
          <TextInput
            label="Protein"
            mode="outlined"
            dense
            autoCapitalize="none"
            value={protein}
            onChangeText={(protein) => setProtein(protein)}
            style={{
              width: wp("80%"),
              height: hp("6%"),
              backgroundColor: "#f8f8f8",
            }}
            outlineColor="black"
            activeOutlineColor="black"
            keyboardType="numeric"
          />
          <TextInput
            label="Karbonhidrat"
            mode="outlined"
            dense
            autoCapitalize="none"
            value={carbs}
            onChangeText={(carbs) => setCarbs(carbs)}
            style={{
              width: wp("80%"),
              height: hp("6%"),
              backgroundColor: "#f8f8f8",
            }}
            outlineColor="black"
            activeOutlineColor="black"
            keyboardType="numeric"
          />
          <TextInput
            label="Yağ"
            mode="outlined"
            dense
            autoCapitalize="none"
            value={fat}
            onChangeText={(fat) => setFat(fat)}
            style={{
              width: wp("80%"),
              height: hp("6%"),
              backgroundColor: "#f8f8f8",
            }}
            outlineColor="black"
            activeOutlineColor="black"
            keyboardType="numeric"
          />
          <Pressable
            className="bg-[#000000] justify-center rounded-xl"
            style={{ width: wp("75%"), height: hp("6%") }}
            onPress={handleSave}
          >
            <Text className="text-center text-white font-bold text-xl">
              Kaydet
            </Text>
          </Pressable>
        </View>
      </Modal>
    </Portal>
  );
}
