import Button from "@/shared/components/Button";
import ReturnButtom from "@/shared/components/ReturnButton";
import SelectBarber from "@/shared/components/SelectBarber";
import SelectDateScreen from "@/shared/components/SelectDateScreen";
import SelectTime from "@/shared/components/SelectTime";
import { Fonts } from "@/shared/tokens";
import { getAvailability } from "@/store/slices/AvailabilitySlice";
import { AppDispatch, RootState } from "@/store/store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {  ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns"; 
import { useRouter, useLocalSearchParams } from "expo-router";



interface SelectBarberProps {
  id: number;
  name: string;
  photoUrl: string;
}



export default function Appointment() {
const slots= useSelector((state:RootState)=>state.slot.slots)
const [pickedTime, setPickedTime] = useState<string | null>(null);
  const [pickedBarber, setPickedBarber] = useState<SelectBarberProps>();

  const masters = useSelector((state: RootState) => state.masters.masters);
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams();
  const serviceId = Number(params.id); // вот твоё число

  useEffect(() => {
  if (slots.length > 0 && !pickedTime) {
    setPickedTime(slots[0]);
  }
}, [slots]);
useEffect(() => {
  if (!masters || masters.length === 0) return;

  // выбираем текущего мастера: либо выбранного, либо первого из списка
  const masterId = pickedBarber ? pickedBarber.id : masters[0].id;

  // текущая дата в формате YYYY-MM-DD
  const date = format(new Date('2025-12-03'), "yyyy-MM-dd");
  // const date = "2025-12-03";


  // dispatch с корректными параметрами
  dispatch(
    getAvailability({
      serviceId,
      masterId,
      date,
    })
  );
}, [pickedBarber, masters,serviceId]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container__header}>
          <ReturnButtom />
          <Text style={[styles.header__top, styles.header__text]}>
            Записаться на приём
          </Text>
        </View>

        <View style={styles.calendar__wrapper}>
          <SelectDateScreen />
        </View>

        <View style={styles.time__wrapper}>
          <Text style={styles.header__text}>Доступное время</Text>

          <View style={styles.available__slot__list}>
            {slots.map((t, index) => (
              <SelectTime
                key={`${t}-${index}`} // уникальный ключ
                time={t}
                pickedTime={pickedTime}
                selectedTime={() => setPickedTime(t)}
              />
            ))}
          </View>

          <Text style={styles.header__text}>Выбор мастера</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.barber__list}
          >
            {masters?.map((item) => (
              <SelectBarber
                key={item.id}
                id={item.id}
                photoUrl={item.photoUrl}
                name={item.name}
                pickedBarberId={pickedBarber?.id}
                pickBarber={() =>
                  setPickedBarber({
                    id: item.id,
                    name: item.name,
                    photoUrl: item.photoUrl,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.confirmButton}>
          <Button title="Подтвердить" onPress={() => console.log("OK")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
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
  barber__list: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
  },
  confirmButton: {
    marginTop: 20,
  },
});
