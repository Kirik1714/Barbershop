import { User } from "@/types/user";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../tokens";

export default function BarberCart({id,name,photoUrl,specialisation}:User ) {
  console.log(photoUrl);
  
  return (
    <View style={styles.barber}>
      <View style={styles.barber__container}>
        <Image
          style={styles.barber_img}
          source={photoUrl?{uri:`http://10.0.2.2:3000${photoUrl}`} :require("../../assets/images/barber1.png")}
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
