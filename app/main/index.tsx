import BarberCart from "@/shared/components/BarberCart";
import SearchBar from "@/shared/components/SearchBar";
import ServiceCart from "@/shared/components/ServiceCart";
import { Colors, Fonts } from "@/shared/tokens";
import { AppDispatch, RootState } from "@/store/store";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllServives } from "@/store/slices/ServicesSlice";

export default function MainScreen() {
  const countServices = 11;
  const services = useSelector((state: RootState) => state.services.services);
  const masters = useSelector((state: RootState) => state.masters.DATA);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllServives());
  }, []);
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
          <View style={styles.services__container__list}>
            <FlashList
              data={services ? services.slice(0, 4) : []}
              contentContainerStyle={styles.services__list}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              renderItem={({ item }) => (
                <ServiceCart
                  title={item.title} // вместо item.name
                  price={item.price}
                  durationMinutes={item.durationMinutes} // вместо item.time
                />
              )}
            />
          </View>
        </View>
        <View style={styles.barbers}>
          <Text style={styles.barbers__count}>Специалисты {countServices}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.barbers_list}
          >
            {masters.slice(0, 4).map((item) => (
              <BarberCart
                key={item.id}
                image={item.image}
                name={item.name}
                specialisation={item.specialisation}
                id={item.id}
              />
            ))}
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
  scrollContent: {
    paddingBottom: 100,
  },
  services: {},
  services__container__list: {},
  services__list: {},
  services__desciption: {
    marginTop: 25,
    marginBottom: 5,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  services__desciption__count: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f17,
    color: Colors.gray,
  },
  services__desciption__other: {
    color: Colors.gray,
  },
  barbers: {
    marginTop: 20,
  },
  barbers__count: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f17,
    color: Colors.gray,
    marginBottom: 7,
  },
  barbers_list: {
    gap: 15,
  },
});
