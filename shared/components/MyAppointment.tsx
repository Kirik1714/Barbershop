import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../tokens";
import { IAppointment } from "@/types/appointment";

interface MyAppointmentProps {
  appointment: IAppointment;
  filter: "upcoming" | "past";
}

export default function MyAppointment({
  appointment,
  filter,
}: MyAppointmentProps) {
  const { master, service, date, time, price } = appointment;
  const photoUri = master.photoUrl
    ? { uri: `http://10.0.2.2:3000${master.photoUrl}` }
    : require("../../assets/images/noImage.png");
  return (
    <View style={styles.container}>
      <View style={styles.date__time}>
        <Text style={styles.dateText}>{date.split("T")[0]}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.description}>
        <Image style={styles.img__master} source={photoUri} />
        <View style={styles.info}>
          <Text style={styles.name__master}> {master.name}</Text>
          <Text style={styles.service}>{service.title}</Text>
        </View>
        <Text style={styles.price}>{price} BYN</Text>
      </View>
      {filter === "upcoming" && (
        <TouchableOpacity style={styles.remove__appointment}>
          <Text style={styles.removeText}>Отменить</Text>
        </TouchableOpacity>
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
});
