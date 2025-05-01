import { View, Text, Pressable } from "react-native";
import React from "react";
import { Portal, Modal, PaperProvider } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";

export default function MyModal({ visible, closeModal, modalText, title }) {
  return (
    <Portal>
      <Modal
        contentContainerStyle={{
          alignSelf: "center",
          backgroundColor: "white",
          padding: wp("5%"),
          width: wp("85%"),
          borderRadius: 10,
        }}
        visible={visible}
        onDismiss={closeModal}
      >
        <Pressable
          onPress={closeModal}
          style={{ position: "absolute", top: wp("3%"), right: wp("3%") }}
        >
          <Entypo name="circle-with-cross" size={24} color="black" />
        </Pressable>
        <Text
          style={{ padding: wp("2%") }}
          className="font-bold text-2xl self-center"
        >
          {title}
        </Text>
        <Text style={{ marginTop: wp("2%"), fontSize: wp("3.8%") }}>
          {modalText?.trim()
            ? modalText
            : "İçindekiler bilgisi bulunmamaktadır."}
        </Text>
      </Modal>
    </Portal>
  );
}
