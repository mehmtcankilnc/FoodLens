import React from "react";
import { Pressable, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { infoData } from "../data/infoData";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";

export default function InfoModal({ visible, closeModal, infoKey }) {
  const data = infoData[infoKey];

  if (!data) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: wp("5%"),
          margin: wp("5%"),
          borderRadius: 10,
        }}
      >
        <Pressable
          onPress={closeModal}
          style={{ position: "absolute", top: wp("3%"), right: wp("3%") }}
        >
          <Entypo name="circle-with-cross" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.title}</Text>
        <Text style={{ marginVertical: 10 }}>{data.description}</Text>

        <Text style={{ fontWeight: "bold" }}>Zararları:</Text>
        {data.risks.map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}

        <Text style={{ fontWeight: "bold", marginTop: 10 }}>
          Alternatifler:
        </Text>
        {data.alternatives.map((item, index) => (
          <Text key={index}>✓ {item}</Text>
        ))}
      </Modal>
    </Portal>
  );
}
