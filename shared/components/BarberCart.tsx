import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../tokens";
import { Master } from "@/types/master";

export default function BarberCart({id,name,image,specialisation}:Master ) {
  return (
    <View style={styles.barber}>
      <View style={styles.barber__container}>
        <Image
          style={styles.barber_img}
          source={require("../../assets/images/barber1.png")}
        />
        <View style={styles.barber__description}>
          <Text style={styles.barber__name}>{name}</Text>
          <Text style={styles.barber__position}>{specialisation}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barber: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: "center",

    width: 140, 
  },
  barber__container: {
    alignItems: "center",
  },
  barber_img: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom: 8,
  },
  barber__description: {
    alignItems: "center",
  },
  barber__name: {
    fontSize: Fonts.f13,
    fontFamily: 'FiraSans-SemiBold',
    textAlign: "center",
  },
  barber__position: {
    fontSize: Fonts.f13,
    fontFamily: 'FiraSans-Regular',
    color: Colors.grey,
    textAlign: "center",
    marginTop: 2,
  },
});
