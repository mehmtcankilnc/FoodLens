import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import Svg, { Path } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";

export default function Register({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        console.error(signUpAttempt.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>E-Postanı onayla</Text>
        <TextInput
          value={code}
          placeholder="Doğrulama kodunu girin"
          onChangeText={(code) => setCode(code)}
        />
        <Pressable onPress={onVerifyPress}>
          <Text>Onayla</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#f8f8f8]">
      <Text
        className="font-bold text-3xl"
        style={{
          position: "absolute",
          top: hp("7%"),
          right: hp("7%"),
          zIndex: 1,
        }}
      >
        Kayıt Ol
      </Text>
      <View style={{ height: hp("9%"), backgroundColor: "#b7edbb" }}>
        <Svg
          height={hp("25%")}
          width={wp("100%")}
          viewBox="0 0 1440 320"
          style={{ transform: [{ scaleX: -1 }] }}
        >
          <Path
            fill="#b7edbb"
            d="M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,202.7C672,203,768,245,864,250.7C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
      <View
        className="flex-1 justify-center items-center"
        style={{ gap: hp("5%") }}
      >
        <Image
          source={require("../../assets/signUp.png")}
          style={{ width: wp("50%"), height: hp("30%") }}
        />
        <View className="items-center" style={{ gap: hp("2%") }}>
          <View className="items-center" style={{ gap: hp("2%") }}>
            <TextInput
              label="Ad Soyad"
              mode="outlined"
              dense
              autoCapitalize="none"
              value={fullName}
              onChangeText={(fullName) => setFullName(fullName)}
              style={{
                width: wp("80%"),
                height: hp("6%"),
                backgroundColor: "#f8f8f8",
              }}
              outlineColor="black"
              activeOutlineColor="black"
            />
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
            <TextInput
              label="Şifre"
              mode="outlined"
              dense
              autoCapitalize="none"
              secureTextEntry={passwordVisible}
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={{
                width: wp("80%"),
                height: hp("6%"),
                backgroundColor: "#f8f8f8",
              }}
              outlineColor="black"
              activeOutlineColor="black"
              right={
                <TextInput.Icon
                  onPress={() => setPasswordVisible((prev) => !prev)}
                  icon={passwordVisible ? "eye-off" : "eye"}
                />
              }
            />
          </View>
        </View>
        <View className="items-center" style={{ gap: hp("1%") }}>
          <Pressable
            className="bg-[#b7edbb] justify-center rounded-xl"
            style={{ width: wp("75%"), height: hp("6%") }}
            onPress={onSignUpPress}
          >
            <Text className="text-center font-bold text-xl">Kaydol</Text>
          </Pressable>
          <View className="flex-row">
            <Text className="font-medium">Zaten hesabın var mı? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text className="font-medium italic underline color-[#b7edbb]">
                Giriş yap
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
