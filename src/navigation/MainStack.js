import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Camera } from "expo-camera";
import BottomTabs from "./BottomTabs";
import CameraPermissionScreen from "../screens/CameraPermissionScreen";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasCameraPermission === false ? (
        <Stack.Screen name="CameraPermission">
          {(props) => (
            <CameraPermissionScreen
              {...props}
              setHasCameraPermission={setHasCameraPermission}
            />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </>
      )}
    </Stack.Navigator>
  );
}
