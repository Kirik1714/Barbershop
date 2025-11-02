import ReturnButtom from "@/shared/components/ReturnButton";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Appointment(){
    return (
        <SafeAreaView style={styles.container}>
            <ReturnButtom/>
            <Text>
                
            </Text>
        </SafeAreaView>
    )

}

const styles= StyleSheet.create({
container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
})
