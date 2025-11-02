import BarberCart from "@/shared/components/BarberCart";
import SearchBar from "@/shared/components/SearchBar";
import ServiceCart from "@/shared/components/ServiceCart";
import { Colors, Fonts } from "@/shared/tokens";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainScreen() {
  const countServices = 11;
  return (
    <SafeAreaView style={styles.container}>
       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
      <SearchBar />
      <View style={styles.services}>
        <View style={styles.services__desciption}>
          <Text style={styles.services__desciption__count}>
            Услуги {countServices}
          </Text>
          <Text style={styles.services__desciption__other}>См. все</Text>
        </View>
        <View style={styles.services__list}>
          <ServiceCart />
          <ServiceCart />
          <ServiceCart />
          <ServiceCart />
        </View>
      </View>
      <View style={styles.barbers}>
        <Text style={styles.barbers__count}>Специалисты {countServices}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.barbers_list}  >

          <BarberCart/>
          <BarberCart/>
          <BarberCart/>

          

        </ScrollView>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  scrollContent:{

    paddingBottom: 100, 
  },
  services: {},
  services__list: {
    gap: 15,
  },
  services__desciption: {
    marginTop: 25,
    marginBottom: 5,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  services__desciption__count: {
    fontFamily: "FiraSans-Regular",
  fontSize:Fonts.f17,
    color: Colors.gray,
  },
  services__desciption__other: {
    color: Colors.gray,
  },
  barbers:{
    marginTop:20,
  },
  barbers__count:{
    fontFamily: "FiraSans-Regular",
    fontSize:Fonts.f17,
    color: Colors.gray,
    marginBottom:7,
  },
  barbers_list:{

    gap:20,
  }
});
