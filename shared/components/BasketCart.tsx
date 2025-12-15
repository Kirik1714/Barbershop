import { Order } from "@/types/services";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors, Fonts } from "../tokens";
import { useEffect } from "react";

interface BasketCartProps extends Order{
  basketItemId:string,
  handleRemoveButton: (id: string ) => void;
}

export default function BasketCart({
  id,
  serviceName,
  masterName,
  servicePrice,
  time,
  date,
  basketItemId,
  handleRemoveButton,

}: BasketCartProps) {
  return (
    <View style={styles.container}>
      <View style={styles.block__info}>
        <View style={styles.icon__scissors}>
          <Entypo name="scissors" size={35} color="blue" />
        </View>
        <View style={styles.description}>
          <Text style={styles.service__title}>{serviceName}</Text>
          <View style={styles.block__master}>
            <View style={styles.icon__master}>
              <Ionicons name="person-circle-outline" size={24} color="black" />
            </View>
            <Text style={styles.master}>{masterName}</Text>
          </View>
          <View style={styles.block__datetime}>
            <View style={styles.icon__calendar}>
              <MaterialCommunityIcons
                name="calendar-blank"
                size={24}
                color="blue"
              />
            </View>
            <Text style={styles.date}>{date}</Text>
            <View style={styles.icon__time}>
              <AntDesign name="field-time" size={24} color="blue" />
            </View>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        <View style={styles.icon__remove}>
          <Pressable onPress={()=>{
  
            handleRemoveButton(basketItemId)}}>
            <Ionicons name="bag-remove-outline" size={30} color="red" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.block__price}>{servicePrice} $</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.84,

    elevation: 4,
  },
  block__info: {
    flexDirection: "row",
  },
  block__price: {
    fontFamily: "FiraSansSemiBold",
    fontSize: Fonts.f23,

    marginLeft: "auto",
  },
  icon__scissors: {
    marginRight: 20,
  },
  description: {
    gap: 7,
  },
  service__title: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f23,
  },
  block__master: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon__master: {},
  master: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f17,
  },
  block__datetime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: Colors.milk,
    padding: 15,
    borderRadius: 10,
  },
  icon__calendar: {},
  date: {},
  icon__time: {},
  time: {},
  icon__remove: { marginLeft: "auto" },
});
