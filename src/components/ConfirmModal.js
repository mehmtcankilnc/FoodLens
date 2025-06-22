import { useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  actionType,
}) {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          className="bg-white items-center"
          style={{
            padding: wp("5%"),
            borderRadius: 10,
            width: wp("80%"),
            gap: wp("3%"),
          }}
        >
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="font-medium text-base text-center color-[gray]">
            {message}
          </Text>
          <View style={{ gap: wp("2%") }}>
            {actionType === "changeFirstLastName" ? (
              <>
                <TextInput
                  label="Yeni Ad"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={newFirstName}
                  onChangeText={(newFirstName) => setNewFirstName(newFirstName)}
                  style={{
                    width: wp("70%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
                <TextInput
                  label="Yeni Soyad"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={newLastName}
                  onChangeText={(newLastName) => setNewLastName(newLastName)}
                  style={{
                    width: wp("70%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
              </>
            ) : actionType === "changeEmail" ? (
              <TextInput
                label="Yeni E-Posta"
                mode="outlined"
                dense
                autoCapitalize="none"
                value={newEmail}
                onChangeText={(newEmail) => setNewEmail(newEmail)}
                style={{
                  width: wp("70%"),
                  height: hp("6%"),
                  backgroundColor: "#f8f8f8",
                }}
                outlineColor="black"
                activeOutlineColor="black"
              />
            ) : actionType === "changePassword" ? (
              <>
                <TextInput
                  label="Eski Şifre"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={oldPassword}
                  onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                  style={{
                    width: wp("70%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
                <TextInput
                  label="Yeni Şifre"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={newPassword}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                  style={{
                    width: wp("70%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
                <TextInput
                  label="Yeni Şifre Onayı"
                  mode="outlined"
                  dense
                  autoCapitalize="none"
                  value={newPasswordConfirm}
                  onChangeText={(newPasswordConfirm) =>
                    setNewPasswordConfirm(newPasswordConfirm)
                  }
                  style={{
                    width: wp("70%"),
                    height: hp("6%"),
                    backgroundColor: "#f8f8f8",
                  }}
                  outlineColor="black"
                  activeOutlineColor="black"
                />
              </>
            ) : actionType === "handleLogout" ? (
              <></>
            ) : actionType === "handleDeleteAccount" ? (
              <></>
            ) : null}
          </View>
          <View
            className="flex-row justify-center"
            style={{
              gap: wp("5%"),
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                backgroundColor: "#ccc",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
            >
              <Text className="font-medium color-black">İptal</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                let payload = null;

                if (actionType === "changeFirstLastName") {
                  payload = { firstName: newFirstName, lastName: newLastName };
                } else if (actionType === "changeEmail") {
                  payload = { email: newEmail };
                } else if (actionType === "changePassword") {
                  payload = {
                    oldPassword: oldPassword,
                    password: newPassword,
                    passwordConfirm: newPasswordConfirm,
                  };
                }

                onConfirm(payload);
                onClose();
              }}
              style={{
                backgroundColor: "#ff5555",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
            >
              <Text className="font-medium color-white">Onayla</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
