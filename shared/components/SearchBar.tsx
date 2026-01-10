import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../tokens";

interface ISearchBar{
  value:string,
  onChangeText:(text:string)=>void
}

export default function SearchBar({value,onChangeText}:ISearchBar) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={Colors.grey}
        style={styles.icon}
      />
      <TextInput
        placeholder="Поиск"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.grey}
        style={styles.input}
        
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.milk,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,

  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Fonts.f17,
    color: Colors.black,
    // fontFamily: "FiraSans-SemiBold",
  },
});
