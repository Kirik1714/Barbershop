import ReturnButtom from "@/shared/components/ReturnButton";
import SelectBarber from "@/shared/components/SelectBarber";
import SelectDateScreen from "@/shared/components/SelectDateScreen";
import SelectTime from "@/shared/components/SelectTime";
import { Fonts } from "@/shared/tokens";
import { useState } from "react";
import { FlatList,  ScrollView,  StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SelectBarberProps {
  id: string;
  name: string;
  image: string;
}

const time = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const barbers = [
  {
    id: "1",
    name: "Alex Johnson",
    image: require('../../assets/images/barber.png'),
  },
  {
    id: "2",
    name: "Maria Lopez",
    image: require(`../../assets/images/barber1.png`),

  },
  {
    id: "3",
    name: "David Kim",
    image: require('../../assets/images/barber.png'),

  },
  {
    id: "4",
    name: "Sophia Brown",
    image: require('../../assets/images/barber.png'),


  },
  {
    id: "5",
    name: "James Smith",
    image: require('../../assets/images/barber.png'),


  },
];
export default function Appointment() {
  const [pickedTime, setPickedTime] = useState<string | undefined>(time[0]);
  const [pickedBarber, setPickedBarber] = useState<
    SelectBarberProps | undefined
  >();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__header}>
        <ReturnButtom />
        <Text style={[styles.header__top, styles.header__text]}>
          Записаться на приём
        </Text>
      </View>
      <View style={styles.pick__full__time}>
        <View style={styles.calendar__wrapper}>
          <SelectDateScreen />
        </View>
        <View style={styles.time__wrapper}>
          <View style={styles.available__slot}>
            <Text style={[styles.header__text]}>Доступноё время</Text>
          </View>

          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.available__slot__list}
            data={time}
            renderItem={({ item }) => (
              <SelectTime
                time={item}
                pickedTime={pickedTime}
                selectedTime={() => setPickedTime(item)}
              />
            )}
          />
          <View style={styles.barber__wrapper}>
            <View style={styles.barber__title}>
              <Text style={styles.header__text}>Выбор мастера</Text>
            </View>
              <FlatList
                data={barbers}
                horizontal
                  contentContainerStyle={styles.barber__list}

                renderItem={({ item }) => (
                  <SelectBarber
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    pickedBarberId={pickedBarber?.id}
                    

                    pickBarber={() => setPickedBarber(item)}
                  />
                )}
              />
         
          </View>
        </View>
      </View>
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  header__text: {
    fontFamily: "FiraSans-SemiBold",
    fontSize: Fonts.f17,
  },
  container__header: {
    flexDirection: "row",
  },
  header__top: {
    margin: "auto",
    alignSelf: "center",
    fontFamily: "FiraSans-SemiBold",
    fontSize: Fonts.f17,
  },
  pick__full__time: {},
  calendar__wrapper: {
    marginTop: 15,
    minHeight: 310,
  },
  time__wrapper: { marginTop: 20 },
  available__slot: {},
  available__slot__text: {},
  available__slot__list: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  barber__wrapper: {
    marginTop: 5,
  },
  barber__title: {},
  barber__list:{
    flexDirection:'row',
    gap:15,
    paddingVertical:10,
  }

});
