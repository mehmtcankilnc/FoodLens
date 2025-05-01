import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Onboarding from "../screens/auth/Onboarding";
import ForgotPassword from "../screens/auth/ForgotPassword";
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
