import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../tokens";
import { useState } from "react";

export default function ReturnButton() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
       style={[
        styles.button,
        { backgroundColor: pressed ? Colors.milk : Colors.white } // меняем фон при нажатии
      ]}
      activeOpacity={1} 
   
    >
      <MaterialIcons
        name="arrow-back-ios"
        size={24}
        color={pressed ? "blue" : "black"} 
        bac
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white, 
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    
  },
});
