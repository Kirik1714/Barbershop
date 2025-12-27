import MyAppointment from "@/shared/components/MyAppointment";
import ReturnButton from "@/shared/components/ReturnButton";
import { Colors, Fonts } from "@/shared/tokens";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Appointments() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ReturnButton />
        <Text style={styles.header__title}>Мои записи</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.content__switcher}>
          <Text>Switcher</Text>
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
