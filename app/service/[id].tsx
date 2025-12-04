import Loader from "@/assets/images/Loader";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import ReturnButtom from "@/shared/components/ReturnButton";
import SelectBarber from "@/shared/components/SelectBarber";
import SelectDateScreen from "@/shared/components/SelectDateScreen";
import SelectTime from "@/shared/components/SelectTime";
import { Fonts } from "@/shared/tokens";
import { getAvailability } from "@/store/slices/AvailabilitySlice";
import { acceptOrder } from "@/store/slices/CartSlices";
import { AppDispatch, RootState } from "@/store/store";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

interface SelectBarberProps {
  id: number;
  name: string;
  photoUrl: string;
}

export default function Appointment() {
  const dispatch = useDispatch<AppDispatch>();
  const router =useRouter()
  const params = useLocalSearchParams();
  const [pickedTime, setPickedTime] = useState<string | null>(null);
  const [pickedBarber, setPickedBarber] = useState<SelectBarberProps>();

  const slots = useSelector((state: RootState) => state.slot.slots);
  const masters = useSelector((state: RootState) => state.masters.masters);
  const loaderSlot = useSelector((state: RootState) => state.slot.loading);
  const loaderMasters = useSelector(
    (state: RootState) => state.masters.loading
  );

  const serviceId = Number(params.id);
  const [selectedDate, setSelectedDate] = useState<string>("");
  useEffect(() => {
    if (slots.length > 0 && !pickedTime) {
      setPickedTime(slots[0]);
    }
  }, [slots]);

  useEffect(() => {
    if (masters && masters.length > 0 && !pickedBarber) {
      const firstMaster = masters[0];
      setPickedBarber({
        id: firstMaster.id,
        name: firstMaster.name,
        photoUrl: firstMaster.photoUrl,
      });
    }
  }, [masters]);

  useEffect(() => {
    if (!masters || masters.length === 0 || !pickedBarber || !selectedDate) {
      return;
    }
    const masterId = pickedBarber.id;
    dispatch(
      getAvailability({
        serviceId,
        masterId,
        selectedDate,
      })
    );
  }, [pickedBarber, masters, serviceId, selectedDate]);

  const handleAppointment = () => {

    if (!pickedBarber || !pickedTime || !selectedDate) {
        console.log("Не все данные для записи выбраны.");
        return; 
    }
    dispatch(
      acceptOrder({
        masterName: pickedBarber?.name,
        serviceName: "Cтрижка",
        date: selectedDate,
        time: pickedTime,
      })
    );
      router.replace("/main/cart");
  };

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
          <SelectDateScreen
            selectedDate={selectedDate}
            setSelectedDate={(date) => setSelectedDate(date)}
          />
        </View>

        {loaderSlot || loaderMasters ? (
          <View style={styles.loader__wrapper}>
            <Loader />
          </View>
        ) : (
          <View style={styles.time__wrapper}>
            <Text style={styles.header__text}>Доступное время</Text>

            <View style={styles.available__slot__list}>
              {slots.length ? (
                slots.map((t, index) => (
                  <SelectTime
                    key={`${t}-${index}`}
                    time={t}
                    pickedTime={pickedTime}
                    selectedTime={() => setPickedTime(t)}
                  />
                ))
              ) : (
                <EmptyState message="доступного времени" />
              )}
            </View>

            <Text style={styles.header__text}>Выбор мастера</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.barber__list}
            >
              {masters?.length ? (
                masters?.map((item) => (
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
                ))
              ) : (
                <EmptyState message="доступного мастера " />
              )}
            </ScrollView>
          </View>
        )}

        <View style={styles.confirmButton}>
          <Button title="Подтвердить" onPress={() => handleAppointment()} />
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
  time__wrapper: { marginTop: 20, minHeight: 340 },
  loader__wrapper: { marginTop: 20, minHeight: 200, marginBottom: 30 },

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
