import { RootState } from "@/store/store";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Cart() {
  const basket = useSelector((state: RootState) => state.basket.basket);
  return (
    <SafeAreaView style={styles.safeArea}>
        
        <Text style={styles.title}>Ваши записи:</Text> 

        {/* ✅ Использование View в качестве контейнера списка */}
        <View style={styles.listContainer}>
          {basket.length === 0 ? (
            <Text style={styles.emptyText}>Ваша корзина пуста.</Text>
          ) : (
            basket.map((item, index) => (
              <View key={index} style={styles.orderCard}>
                <Text style={styles.orderDetail}>Услуга: {item.serviceName}</Text>
                <Text style={styles.orderDetail}>Мастер: {item.masterName}</Text>
                <Text style={styles.orderDetail}>Дата: {item.date}</Text>
                <Text style={styles.orderDetail}>Время: {item.time}</Text>
              </View>
            ))
          )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listContainer: {
        flex: 1,
    },
    orderCard: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    orderDetail: {
        fontSize: 16,
        marginBottom: 3,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    }
});