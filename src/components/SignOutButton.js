import { useClerk } from "@clerk/clerk-expo";
import { Text, Pressable } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text>Çıkış Yap</Text>
    </Pressable>
  );
};
