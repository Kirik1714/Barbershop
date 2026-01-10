import AppointmentSwitcher from "@/shared/components/AppointmentSwitcher";
import MyAppointment from "@/shared/components/MyAppointment";
import ReturnButton from "@/shared/components/ReturnButton";
import {  Fonts } from "@/shared/tokens";
import { getMyAppointments } from "@/store/slices/AppointmentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Appointments() {

  const dispatch=useDispatch<AppDispatch>();
  const appointments = useSelector((state:RootState)=>state.appointment.appointments);
  const [filter,setFilter]=useState<"upcoming" | "past">('upcoming');
  useEffect(()=>{
        dispatch(getMyAppointments())
      
  },[])

  const filteredData=useMemo(()=>{
    const now=new Date();

    return appointments.filter((item)=>{
      const datePast = item.date.split("T")[0];
      const appointmentDate= new Date(`${datePast}T${item.time}:00`);

      if(filter==='upcoming'){
        return appointmentDate>=now
      }else{
        return appointmentDate<now;
      }
    })

  },[filter,appointments])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ReturnButton />
        <Text style={styles.header__title}>Мои записи</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.content__switcher}>
          <AppointmentSwitcher onTabChange={(tab)=>setFilter(tab)}/>
        </View>
        <View style={styles.content__appointment}>
          <FlatList 
          data={filteredData}
          keyExtractor={(item)=>item.id.toString()}
          contentContainerStyle={{paddingBottom:100}}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={({item})=>(
            <MyAppointment  appointment ={item} filter={filter}/>
          )}

          />

       

         
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
  content: {
    flex:1,
  },
  list:{
    flex:1,
  },
  content__switcher:{},
  content__appointment:{
    flex: 1,
  }
});
