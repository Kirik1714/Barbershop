import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../tokens";

interface SelectBarberProps {
  id: number;
  photoUrl: string;
  name: string;
  pickedBarberId?: number;
  pickBarber: (barber: { id: number; name: string; photoUrl: string }) => void;
}
export default function SelectBarber({
  id,
  photoUrl,
  name,
  pickedBarberId,
  pickBarber,
}: SelectBarberProps) {
  const isSelected = id === pickedBarberId;

  return (
    <TouchableOpacity
      onPress={() => pickBarber({ id, name, photoUrl })}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <Image
        source={
          photoUrl
            ? { uri: `http://10.0.2.2:3000${photoUrl}` }
            : require("../../assets/images/barber1.png")
        }
        style={styles.photo}
      />

      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 150,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 10,
  },

  cardSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 6,
  },

  photo: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },

  name: {
    marginTop: 8,
    fontSize: Fonts.f13,
    color: Colors.black,
    fontFamily: "FiraSans-SemiBold",
  },

  nameSelected: {
    color: Colors.primary,
  },
});
