import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/shared/tokens";
import { Dimensions } from "react-native";

export default function MainLayout() {
  const { width } = Dimensions.get("window");
  const tabWidth = width * 0.85;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginHorizontal: (width - tabWidth) / 2, 
          width: tabWidth,
          height: 65,
          borderRadius: 15,
          backgroundColor: Colors.white,
          elevation: 5,
          paddingTop:5,
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
       
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({  focused }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={30}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
    
      <Tabs.Screen
        name="cart"
        options={{
          title: "Корзина",
          tabBarIcon: ({  focused }) => (
            <Feather
              name="shopping-cart"
              size={28}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={30}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
       
    
    </Tabs>
  );
}
