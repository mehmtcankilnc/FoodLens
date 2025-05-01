import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Svg, { Path } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";

export default function Login({ navigation }) {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(signInAttempt.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-[#f8f8f8]">
      <Text
        className="font-bold text-3xl"
        style={{
          position: "absolute",
          top: hp("7%"),
          left: hp("7%"),
          zIndex: 1,
        }}
      >
        Giriş Yap
      </Text>
      <View style={{ height: hp("9%"), backgroundColor: "#b7edbb" }}>
        <Svg height={hp("25%")} width={wp("100%")} viewBox="0 0 1440 320">
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
          source={require("../../assets/signIn.png")}
          style={{ width: wp("50%"), height: hp("30%") }}
        />
        <View className="items-center" style={{ gap: hp("2%") }}>
          <View className="items-center" style={{ gap: hp("2%") }}>
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
            <View className="items-end" style={{ gap: wp("1%") }}>
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
              <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
                <Text className="font-medium italic">Şifremi unuttum</Text>
              </Pressable>
            </View>
          </View>
          <View className="items-center" style={{ gap: hp("2%") }}>
            <Pressable
              className="bg-[#b7edbb] justify-center rounded-xl"
              style={{ width: wp("75%"), height: hp("6%") }}
              onPress={onSignInPress}
            >
              <Text className="text-center font-bold text-xl">Giriş yap</Text>
            </Pressable>

            <View
              className="border-t self-center border-black"
              style={{ width: wp("65%"), marginTop: hp("1%") }}
            />
            <View className="flex-row">
              <Text className="font-medium">Hesabın yok mu? </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text className="font-medium italic underline color-[#b7edbb]">
                  Kaydol
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
