import "./gesture-handler";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import AuthStack from "./src/navigation/AuthStack";
import { PaperProvider } from "react-native-paper";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const toastConfig = {
  successCustom: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#3f6942" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "gray",
      }}
    />
  ),
};

const RootNavigation = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return;

  return isSignedIn ? <MainStack /> : <AuthStack />;
};

export default function App() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#3f6942");
  }, []);

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
      proxyUrl="enjoyed-terrier-52.clerk.accounts.dev"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <NavigationContainer>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </ClerkProvider>
  );
}
