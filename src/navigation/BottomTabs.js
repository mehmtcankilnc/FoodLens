import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main/HomeScreen";
import ScanScreen from "../screens/main/ScanScreen";
import Profile from "../screens/main/Profile";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { user } = useUser();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#52c46f",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderRadius: 20,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#52c46f" : "black"}
            />
          ),
          title: (
            <Text className="font-bold text-3xl text-white">
              Merhaba, {user?.firstName}!
            </Text>
          ),
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#3f6942",
            height: hp("25%"),
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarLabel: "Ana Sayfa",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="scan1"
              size={24}
              color={focused ? "#52c46f" : "black"}
            />
          ),
          tabBarLabel: "Tara",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? "#52c46f" : "black"}
            />
          ),
          tabBarLabel: "Profil",
          title: "Profil",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#3f6942",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}
