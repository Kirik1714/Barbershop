import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../tokens";
import { IAppointment } from "@/types/appointment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { cancelAppointment } from "@/store/slices/AppointmentSlice";

interface MyAppointmentProps {
  appointment: IAppointment;
  filter: "upcoming" | "past";
}

export default function MyAppointment({
  appointment,
  filter,
}: MyAppointmentProps) {
  const { master, service, date, time, price,id,status } = appointment;
    const dispatch = useDispatch<AppDispatch>();
    const isCancelled = status === 'cancelled'; 

  const photoUri = master.photoUrl
    ? { uri: `http://10.0.2.2:3000${master.photoUrl}` }
    : require("../../assets/images/noImage.png");

    const handleCancel=()=>{
      dispatch(cancelAppointment(Number(id)))
    }


  return (
    <View style={[styles.container,isCancelled && styles.containerCancelled]}>
      <View style={styles.date__time}>
        <Text style={[styles.dateText ,isCancelled && styles.textDisabled]}>{date.split("T")[0]}</Text>
       <Text style={[styles.timeText, isCancelled && styles.textDisabled]}>
          {isCancelled ? "Отменено" : time}
        </Text>
      </View>
      <View style={styles.description}>
        <Image style={[styles.img__master , isCancelled && { opacity: 0.5 }]} source={photoUri} />
        <View style={styles.info}>
          <Text style={[styles.name__master,isCancelled && styles.textDisabled]}> {master.name}</Text>
          <Text style={[styles.service,isCancelled && styles.textDisabled]}>{service.title}</Text>
        </View>
        <Text style={[styles.price,isCancelled && styles.textDisabled]}>{price} BYN</Text>
      </View>
    {filter === "upcoming" && (
        !isCancelled ? (
          <TouchableOpacity 
            style={styles.remove__appointment} 
            onPress={handleCancel}
          >
            <Text style={styles.removeText}>Отменить</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cancelledBadge}>
            <Text style={styles.cancelledBadgeText}>Вы отменили эту запись</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerCancelled: {
    opacity: 0.6, 
    backgroundColor: Colors.dark__white, 
  },
  date__time: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 10,
    marginBottom: 10,
  },
  dateText: {
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    color: Colors.black,
  },
  textDisabled:{
    color: Colors.grey, 
    textDecorationLine: 'line-through'

  },
  timeText: {
    fontFamily: "FiraSans-Bold",
    fontSize: 16,
    color: Colors.primary,
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
  },
  img__master: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name__master: {
    fontSize: Fonts.f20,
    fontFamily: "FiraSans-Regular",
    color: Colors.black,
  },
  service: {
    fontSize: Fonts.f17,
    fontFamily: "FiraSans-Regular",
    color: Colors.grey,
  },
  price: {
    fontSize: Fonts.f17,
    fontFamily: "FiraSans-Regular",
    color: Colors.black,
  },
  remove__appointment: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.button__red,
    alignItems: "center",
  },
  removeText: {
    color: Colors.button__red,
    fontSize: 14,
    fontFamily: "FiraSans-Regular",
  },
  cancelledBadge: {
    marginTop: 15,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  cancelledBadgeText: {
    color: Colors.grey,
    fontFamily: "FiraSans-Regular",
    fontSize: 13,
  }
});
