import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../tokens";

interface SelectTimeProps {
  time: string;
  pickedTime?: string; 
  selectedTime: (time: string) => void;
}

export default function SelectTime({
  time,
  pickedTime,
  selectedTime,
}: SelectTimeProps) {
  return (
    <TouchableOpacity
      style={[styles.container, time === pickedTime && styles.timeActive]}
      onPress={() => selectedTime(time)}
    >
      <Text
        style={[styles.time, time === pickedTime && { color: Colors.white }]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
   width: "29.5%",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  time: {
    fontFamily: "FiraSans-Regular",
    fontSize: Fonts.f20,
  },
  timeActive: {
    backgroundColor: Colors.primary,
  },
});
