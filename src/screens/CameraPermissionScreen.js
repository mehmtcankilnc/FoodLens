import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Camera } from "expo-camera";

export default function CameraPermissionScreen(props) {
  const { setHasCameraPermission } = props;

  const handleCameraPermissionRequest = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  return (
    <View className="flex-1 justify-center items-center gap-10">
      <Image
        source={require("../assets/permissionCamera.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text className="font-bold text-2xl">Kameranıza izin verin</Text>
      <Text className="font-medium text-base p-8 text-center">
        Kameranızı kullanabilmek için izninize ihtiyacımız var.
      </Text>
      <Pressable
        style={{
          width: 200,
          height: 50,
          backgroundColor: "#22a45d",
          justifyContent: "center",
          borderRadius: 24,
        }}
        onPress={handleCameraPermissionRequest}
      >
        <Text className="text-center font-semibold text-lg">İzin Ver</Text>
      </Pressable>
    </View>
  );
}
