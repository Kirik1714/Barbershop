import { StyleSheet, TextInput, View } from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText:(text:string)=>void

  secureTextEntry?: boolean;
};

export default function Input({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
}: InputProps) {
  return (
    <>
      <View >
        <TextInput
        style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    input:{
        height:58,
        backgroundColor:Colors.milk,
        color:Colors.grey,
        width:"100%",
        borderRadius:Radius.r10,
        paddingLeft:10,
        fontSize:Fonts.f17,
        fontFamily:'FiraSans-Regular',


    }
});
