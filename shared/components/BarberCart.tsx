import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../tokens";

export default function BarberCart() {
  return (
    <View style={styles.barber}>
      <View style={styles.barber__container}>
        <Image
          style={styles.barber_img}
          source={require("../../assets/images/barber1.png")}
        />
        <View style={styles.barber__description}>
          <Text style={styles.barber__name}>Имя</Text>
          <Text style={styles.barber__position}>Специализации</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barber: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius:2,
  },
  barber__container: {
    alignItems: "center",
  },
  barber_img: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom:10,
  },

  barber__description: {},
  barber__name: {
        fontSize:Fonts.f13,

      fontFamily:'FiraSans-SemiBold',
  },
  barber__position: {
        fontSize:Fonts.f13,
      fontFamily:'FiraSans-SemiBold',
  },
});
