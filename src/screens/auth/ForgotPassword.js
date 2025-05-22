import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import VerificationCodeInput from "../../components/VerificationCodeInput";
import Toast from "react-native-toast-message";

export default function ForgotPassword({ navigation }) {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();

  const signInRef = useRef(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const onResetPassword = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      signInRef.current = result;
      setCodeSent(true);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Geçersiz E-posta!",
        text2: "Lütfen geçerli bir e-posta adresi girin.",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  const verifyCode = async () => {
    if (!isLoaded || !signInRef.current) return;

    try {
      await signInRef.current.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      setCodeVerified(true);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Kod Hatalı!",
        text2: "Lütfen doğrulama kodunu kontrol edip tekrar deneyin.",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  const onChangePassword = async () => {
    if (!isLoaded && !signInRef.current) return;

    try {
      await signInRef.current.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Başarılı!",
        text2: "Şifreniz Değiştirildi!",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });

      await signOut();

      navigation.replace("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Başarısız!",
        text2: "Bir hata oluştu!",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 bg-[#f8f8f8] items-center">
          <Text
            className="font-bold text-3xl text-white"
            style={{
              position: "absolute",
              top: hp("7%"),
              zIndex: 1,
            }}
          >
            Şifremi Unuttum
          </Text>
          <View style={{ height: hp("9%"), backgroundColor: "#3f6942" }}>
            <Svg
              height={hp("25%")}
              width={wp("100%")}
              viewBox="0 0 1440 320"
              style={{ transform: [{ scaleX: -1 }] }}
            >
              <Path
                fill="#3f6942"
                d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,144C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </Svg>
          </View>
          <View
            className="flex-1 justify-center items-center"
            style={{ gap: hp("4%") }}
          >
            <Image
              source={require("../../assets/forgotPassword.png")}
              style={{ width: wp("50%"), height: hp("30%") }}
            />
            <Text
              className="font-medium text-center"
              style={{ width: wp("70%") }}
            >
              {!codeSent
                ? "Şifre sıfırlama kodu almak için e-postanızı girin"
                : !codeVerified
                ? "E-postanıza gelen doğrulama kodunu girin"
                : "Lütfen yeni şifrenizi girin"}
            </Text>
            {!codeSent ? (
              <>
                <TextInput
                  label="E-Posta"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={emailAddress}
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  style={{
                    width: wp("80%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
                <Pressable
                  className="bg-[#3f6942] justify-center rounded-xl"
                  style={{ width: wp("75%"), height: hp("6%") }}
                  onPress={onResetPassword}
                >
                  <Text className="text-center font-bold text-xl text-white">
                    Onayla
                  </Text>
                </Pressable>
              </>
            ) : !codeVerified ? (
              <>
                <VerificationCodeInput value={code} setValue={setCode} />
                <Pressable
                  className="bg-[#3f6942] justify-center rounded-xl"
                  style={{ width: wp("75%"), height: hp("6%") }}
                  onPress={verifyCode}
                >
                  <Text className="text-center font-bold text-xl text-white">
                    Onayla
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <TextInput
                  label="Yeni Şifre"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={newPassword}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                  style={{
                    width: wp("80%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
                <Pressable
                  className="bg-[#3f6942] justify-center rounded-xl"
                  style={{ width: wp("75%"), height: hp("6%") }}
                  onPress={onChangePassword}
                >
                  <Text className="text-center font-bold text-xl text-white">
                    Onayla
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
