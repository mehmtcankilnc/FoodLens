import { View, Text, Image, Pressable, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useUser, useClerk } from "@clerk/clerk-expo";
import GoalModal from "../../components/GoalModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmModal from "../../components/ConfirmModal";
import EmailVerifyModal from "../../components/EmailVerifyModal";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isMounted, setIsMounted] = useState(false);
  const [goalModalVisibility, setGoalModalVisibility] = useState(false);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 170,
    carbs: 270,
    fat: 48,
  });

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});
  const [action, setAction] = useState("");

  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [pendingEmailAddress, setPendingEmailAddress] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !user) return null;

  const handleSave = (newGoals) => {
    setGoals(newGoals);
  };

  const showConfirmModal = (message, title, action, actionName) => {
    setConfirmMessage(message);
    setConfirmTitle(title);
    setOnConfirmAction(() => action);
    setConfirmVisible(true);
    setAction(actionName);
  };

  const handleUpdateName = async (newFirstName, newLastName) => {
    if (!newFirstName || !newLastName) return;
    try {
      await user.update({
        firstName: newFirstName,
        lastName: newLastName,
      });
      alert("Ad soyad güncellendi!");
    } catch (error) {
      console.error("Ad soyad güncelleme hatası:", error);
    }
  };

  const handleUpdateEmail = async (newEmail) => {
    if (!newEmail) return;
    try {
      await user.createEmailAddress({ email: newEmail });

      await user.reload();

      const addedEmail = user.emailAddresses.find(
        (e) => e.emailAddress === newEmail
      );

      if (!addedEmail) {
        alert("E-posta eklenemedi.");
        return;
      }

      await addedEmail.prepareVerification({ strategy: "email_code" });

      setPendingEmailAddress(newEmail);
      setVerificationModalVisible(true);
    } catch (error) {
      console.error("E-posta güncelleme hatası:", error);
      alert("Kod gönderilemedi.");
    }
  };

  const handleVerifyEmail = async (code) => {
    try {
      const cleanedCode = code.replace(/\s/g, "");

      const email = user.emailAddresses.find(
        (e) => e.emailAddress === pendingEmailAddress
      );

      if (!email) {
        alert("E-posta bulunamadı.");
        return;
      }

      await email.attemptVerification({ code: cleanedCode });

      alert("E-posta doğrulandı!");
      setVerificationModalVisible(false);
    } catch (error) {
      console.error("Doğrulama hatası:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  const handleUpdatePassword = async (oldPassword, newPassword) => {
    if (!newPassword) return;
    try {
      await user.updatePassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
      });
      alert("Şifre başarıyla değiştirildi.");
    } catch (error) {
      console.error("Şifre güncelleme hatası:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      alert("Hesap silindi.");
    } catch (error) {
      console.error("Hesap silme hatası:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: wp("3%"),
        gap: hp("1%"),
        alignItems: "center",
      }}
    >
      <View className="items-center" style={{ gap: wp("3%") }}>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 75, height: 75, borderRadius: 9999 }}
        />
        <View style={{ gap: wp("1%") }}>
          <Text className="font-bold text-xl capitalize">{user.fullName}</Text>
          <Text className="font-medium text-[gray] italic">
            {user.emailAddresses[0].emailAddress}
          </Text>
        </View>
      </View>

      <View
        className="bg-[#f8f8f8] items-center"
        style={{
          gap: wp("2%"),
          padding: wp("2%"),
          elevation: 7,
          width: wp("90%"),
        }}
      >
        <View className="flex-row" style={{ gap: wp("2%") }}>
          <View
            style={{ padding: wp("2%"), width: wp("100%") }}
            className="items-center justify-center"
          >
            <Text className="font-medium text-2xl italic">
              {goals.calories} kcal
            </Text>
            <Text className=" text-lg">Kalori</Text>
          </View>
        </View>
        <View className="flex-row" style={{ gap: wp("2%") }}>
          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center "
          >
            <Text className="font-medium text-xl italic">
              {goals.protein} g
            </Text>
            <Text numberOfLines={1} className=" text-base">
              Protein
            </Text>
          </View>

          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center  "
          >
            <Text className="font-medium text-xl italic">{goals.carbs} g</Text>

            <Text numberOfLines={1} className=" text-base">
              Karbonhidrat
            </Text>
          </View>

          <View
            style={{ padding: wp("2%") }}
            className="flex-1 justify-between items-center"
          >
            <Text className="font-medium text-xl italic">{goals.fat} g</Text>
            <Text numberOfLines={1} className="text-base">
              Yağ
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => setGoalModalVisibility(true)}
          style={{ padding: wp("2%"), gap: wp("2%") }}
          className="flex-row items-center bg-[#3f6942] rounded-md"
        >
          <Text className="text-white">Hedefleri Düzenle</Text>
          <MaterialCommunityIcons name="lead-pencil" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={{ marginTop: wp("2%") }} className="text-lg italic">
        Kişisel Bilgiler
      </Text>
      <View style={{ gap: wp("4%"), padding: wp("2%") }}>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
          onPress={() =>
            showConfirmModal(
              "Lütfen değiştirmek isteğiniz bilgileri giriniz.",
              "Ad Soyad Değiştir",
              handleUpdateName,
              "changeFirstLastName"
            )
          }
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <AntDesign name="user" size={24} color="black" />
            <Text className="font-bold text-lg">Ad Soyad</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
          onPress={() =>
            showConfirmModal(
              "Lütfen değiştirmek isteğiniz bilgileri giriniz.",
              "E-Posta Değiştir",
              handleUpdateEmail,
              "changeEmail"
            )
          }
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text className="font-bold text-lg">E-Posta</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
          onPress={() =>
            showConfirmModal(
              "Lütfen değiştirmek isteğiniz bilgileri giriniz.",
              "Şifre Değiştir",
              handleUpdatePassword,
              "changePassword"
            )
          }
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text className="font-bold text-lg">Şifre Değiştir</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() =>
            showConfirmModal(
              "Çıkış yapmak istediğinize emin misiniz?",
              "Çıkış Yap",
              handleSignOut,
              "handleLogout"
            )
          }
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={24}
              color="black"
            />
            <Text className="font-bold text-lg">Çıkış Yap</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-row justify-between bg-[#eaeaea] rounded-md"
          style={{ padding: wp("3%") }}
          onPress={() =>
            showConfirmModal(
              "Hesabı kalıcı olarak silmek istediğinize emin misiniz?",
              "Hesabı Sil",
              handleDeleteAccount,
              "handleDeleteAccount"
            )
          }
        >
          <View className="flex-row items-center" style={{ gap: wp("5%") }}>
            <AntDesign name="delete" size={24} color="black" />
            <Text className="font-bold text-lg">Hesabı Sil</Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </Pressable>
      </View>
      {goalModalVisibility && (
        <GoalModal
          visible={goalModalVisibility}
          closeModal={() => setGoalModalVisibility(false)}
          saveData={handleSave}
          goals={goals}
        />
      )}
      <ConfirmModal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={(payload) => {
          if (action === "changeFirstLastName") {
            const { firstName, lastName } = payload || {};
            handleUpdateName(firstName, lastName);
          } else if (action === "changeEmail") {
            const { email } = payload || {};
            handleUpdateEmail(email);
          } else if (action === "changePassword") {
            const { oldPassword, password, passwordConfirm } = payload || {};
            if (password !== passwordConfirm) {
              alert("Şifreler uyuşmuyor!");
              return;
            }
            handleUpdatePassword(oldPassword, password);
          } else if (action === "handleLogout") {
            handleSignOut();
          } else if (action === "handleDeleteAccount") {
            handleDeleteAccount();
          }

          setConfirmVisible(false);
        }}
        title={confirmTitle}
        message={confirmMessage}
        actionType={action}
      />
      <EmailVerifyModal
        visible={verificationModalVisible}
        onClose={() => setVerificationModalVisible(false)}
        onVerify={(code) => handleVerifyEmail(code)}
      />
    </ScrollView>
  );
}
