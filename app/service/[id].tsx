import ReturnButtom from "@/shared/components/ReturnButton";
import SelectDateScreen from "@/shared/components/SelectDateScreen";
import SelectTime from "@/shared/components/SelectTime";
import { Fonts } from "@/shared/tokens";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
export default function Appointment() {
const [pickedTime, setIsPicked] = useState<string | undefined>(time[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__header}>
        <ReturnButtom />
        <Text style={styles.header__top}>Записаться на приём</Text>
      </View>
      <View style={styles.pick__full__time}>
        <View style={styles.calendar__wrapper}>
          <SelectDateScreen />
        </View>
        <View style={styles.time__wrapper}>
          <View style={styles.available__slot}>
            <Text style={styles.available__slot__text}>Доступноё время</Text>
          </View>

          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.available__slot__list}
            data={time}
            renderItem={({ item }) => (
              <SelectTime time={item} pickedTime={pickedTime} selectedTime={() => setIsPicked(item)} />
            )}
          />
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
  time__wrapper: { marginTop: 15 },
  available__slot: {},
  available__slot__text: {
    fontFamily: "FiraSans-SemiBold",
    fontSize: Fonts.f17,
  },
  available__slot__list: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
});
