import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from "react-native";

interface SelectBarberProps {
  id: string;
  name: string;
  image: ImageSourcePropType;
  pickedBarberId?:string;
  pickBarber: (id: string) => void;
}

export default function SelectBarber({
  id,
  image,
  name,
  pickBarber,
}: SelectBarberProps) {
  return (
    <TouchableOpacity onPress={() => pickBarber(id)} style={styles.container}>
      <Image
        source={image}
        style={styles.barber__image}
      />
      <Text style={styles.barber__name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  barber__image: {
    width:100,
    height:100,
  },
  barber__name: {},
});
