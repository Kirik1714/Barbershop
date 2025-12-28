import AppointmentSwitcher from "@/shared/components/AppointmentSwitcher";
import MyAppointment from "@/shared/components/MyAppointment";
import ReturnButton from "@/shared/components/ReturnButton";
import {  Fonts } from "@/shared/tokens";
import { getMyAppointments } from "@/store/slices/AppointmentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Appointments() {

  const dispatch=useDispatch<AppDispatch>();
  const appointments = useSelector((state:RootState)=>state.appointment.appointments)

  useEffect(()=>{

        dispatch(getMyAppointments())
      
    
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ReturnButton />
        <Text style={styles.header__title}>Мои записи</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.content__switcher}>
          <AppointmentSwitcher/>
        </View>
        <View style={styles.content__appointment}>
            <MyAppointment/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header__title: {
    fontSize: Fonts.f23,
    fontFamily: "FiraSans-Regular",
  },
  container: {
    flex: 1,
    margin: 25,
  },
  content: {},
  content__switcher:{},
  content__appointment:{}
});
