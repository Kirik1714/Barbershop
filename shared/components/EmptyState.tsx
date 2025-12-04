import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import { Fonts } from "../tokens";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        К сожелению нет {message} {' '} 
        <Entypo name="emoji-sad" size={24} color="black" />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
   alignItems: 'center', 
    
    justifyContent: 'center',
  },
  text: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f17,
  
  },
});
