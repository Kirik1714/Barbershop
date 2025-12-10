import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../tokens";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Service } from "@/types/services";

type ServiceCartProps =Pick<Service,'id'|'title'|'durationMinutes'|'price'|'photoUrl'>

export default function ServiceCart({id,title,durationMinutes,price,photoUrl}:ServiceCartProps) {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);
  console.log(photoUrl);

  return (
    <View style={styles.service}>
      <View style={styles.service__descriptions}>
        <Image
          style={styles.img}
         source={
    photoUrl
      ? { uri: `http://10.0.2.2:3000${photoUrl}` } 
      : require("../../assets/images/noImage.png") 
  }

        />
        <View style={styles.descriptions__options}>
          <View style={styles.descriptions__options__name}>
            <Text style={styles.nameText}>{title}</Text>
          </View>
          <View style={styles.descriptions__options__otherInfo}>
            <Text style={styles.price}>{price} $</Text>
            <Text style={styles.time}>{durationMinutes}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.make_an_appointment}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={() => router.push({
            pathname:`/service/${id}` as any,
            params:{
              title,
              price,
            }
          })}
        >
          <FontAwesome6
            name="add"
            size={24}
            color={pressed ? "blue" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  service: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 15,
  },
  service__descriptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  descriptions__options: {
    gap: 15,
    flexShrink: 1,
    marginRight: 8,
  },
  descriptions__options__name: {},
  nameText: {
    fontSize: Fonts.f17,
    fontFamily: "FiraSans-SemiBold",
  },
  descriptions__options__otherInfo: {},
  price: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f13,
  },
  time: {
    fontFamily: "FiraSans-Regular",
  },
  make_an_appointment: {
    marginLeft: "auto",
    marginRight: 20,
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 12,
  },
});
