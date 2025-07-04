import { View, Text, Pressable } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { CameraView } from "expo-camera";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

export default function ScanScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
    }, [])
  );

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${data}?lc=tr`
      );

      if (response.data.status === 0) {
        alert("Bu barkoda ait ürün bulunamadı.");
        setScanned(false);
        return;
      }

      navigation.navigate("ProductDetail", { product: response.data.product });
    } catch (error) {
      console.error("Ürün alınamadı:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      className="flex-1 justify-around"
      style={{
        marginVertical: 36,
        marginHorizontal: 24,
      }}
    >
      <View className="flex-row items-center justify-between">
        <AntDesign name="back" size={36} color="#3f6942" />
        <Pressable
          style={{
            width: 150,
            height: 50,
            backgroundColor: "#3f6942",
            justifyContent: "center",
            borderRadius: 24,
          }}
          onPress={pickImage}
        >
          <Text className="text-center font-semibold text-lg text-white">
            Galeriden Seç
          </Text>
        </Pressable>
      </View>
      <View className="items-center">
        {!scanned && (
          <View style={{ position: "relative", width: 300, height: 500 }}>
            {isFocused && !scanned && (
              <CameraView
                style={{ width: 300, height: 500, borderRadius: 24 }}
                ref={cameraRef}
                facing="back"
                mute={false}
                responsiveOrientationWhenOrientationLocked
                onBarcodeScanned={handleBarCodeScanned}
              />
            )}

            {/* Overlay View burada */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: "80%",
                  position: "relative",
                }}
              >
                {/* Sol üst */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderTopWidth: 4,
                    borderLeftWidth: 4,
                    borderTopLeftRadius: 10,
                    borderColor: "#3f6942",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                {/* Sağ üst */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderTopWidth: 4,
                    borderRightWidth: 4,
                    borderTopRightRadius: 10,
                    borderColor: "#3f6942",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                />
                {/* Sol alt */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderBottomWidth: 4,
                    borderLeftWidth: 4,
                    borderBottomLeftRadius: 10,
                    borderColor: "#3f6942",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                />
                {/* Sağ alt */}
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderBottomWidth: 4,
                    borderRightWidth: 4,
                    borderBottomRightRadius: 10,
                    borderColor: "#3f6942",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
