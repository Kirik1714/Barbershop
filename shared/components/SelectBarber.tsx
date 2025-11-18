import { 
  Image, 
  ImageSourcePropType, 
  StyleSheet, 
  Text, 
  TouchableOpacity 
} from "react-native";
import { Colors, Fonts } from "../tokens";

interface SelectBarberProps {
  id: string;
  name: string;
  image: ImageSourcePropType;
  pickedBarberId?: string;
  pickBarber: (id: string) => void;
}

export default function SelectBarber({
  id,
  image,
  name,
  pickedBarberId,
  pickBarber,
}: SelectBarberProps) {
  const isSelected = id === pickedBarberId;

  return (
    <TouchableOpacity
      onPress={() => pickBarber(id)}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <Image source={image} style={styles.photo} />
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
