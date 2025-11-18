import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text  style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles =StyleSheet.create({
    button:{
        height: 58,
        backgroundColor: Colors.primary, 
        borderRadius: Radius.r10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        
    },
    text:{
        textAlign:'center',
        fontSize:Fonts.f17,
        fontWeight:600,
        color:Colors.milk,
        fontFamily:'FiraSans-SemiBold',
        
    },
})