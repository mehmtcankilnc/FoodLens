import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import BottomNav from "./BottomNav";
import CameraPermissionScreen from "../screens/CameraPermissionScreen";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator();

export default function MainStack() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === "granted");
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
          <Stack.Screen name="MainApp" component={BottomNav} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </>
      )}
    </Stack.Navigator>
  );
}
