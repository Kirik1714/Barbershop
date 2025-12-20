import BasketCart from "@/shared/components/BasketCart";
import { AppDispatch, RootState } from "@/store/store";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Colors } from "@/shared/tokens";
import { makeAnAppointment, unreserveAndRemoveOrder } from "@/store/slices/CartSlices";

export default function Cart() {
  const basket = useSelector((state: RootState) => state.basket.basket);
  const loading = useSelector((state:RootState)=>state.basket.loading)
  const totalAmount = basket.reduce((sum, item) => sum + item.servicePrice, 0);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveButton = (basketItemId: string) => {
    const itemToRemove = basket.find(
      (item) => item.basketItemId === basketItemId
    );

    if (itemToRemove) {
      dispatch(unreserveAndRemoveOrder(itemToRemove));
    } else {
      console.error("Item not found in basket:", basketItemId);
    }
  };

  const handleMakeAnAppointment=async()=>{
  try {
      await dispatch(makeAnAppointment());
      
      Alert.alert("Успешно", "Ваша запись подтверждена!");
    } catch (err: any) {
      Alert.alert("Ошибка", err || "Не удалось оформить заказ");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Ваша корзина:</Text>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {basket.length === 0 ? (
          <Text style={styles.emptyText}>Ваша корзина пуста.</Text>
        ) : (
          basket.map((item, index) => (
            <BasketCart
              key={index}
              id={item.id}
              date={item.date}
              masterName={item.masterName}
              serviceName={item.serviceName}
              servicePrice={item.servicePrice}
              time={item.time}
              basketItemId={item.basketItemId}
              handleRemoveButton={handleRemoveButton}
              masterId={item.masterId}
            />
          ))
        )}
      </ScrollView>

      {basket.length > 0 && (
        <View style={styles.summaryBlock}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Итого ({basket.length} усл.):</Text>
            <Text style={styles.totalPrice}>{totalAmount} BYN</Text>
          </View>
         <TouchableOpacity 
            style={[styles.checkoutButton, loading && { opacity: 0.7 }]} // Слегка гасим кнопку при загрузке
            onPress={handleMakeAnAppointment}
            disabled={loading} // Блокируем кнопку во время запроса
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} /> // Показываем спиннер
            ) : (
              <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
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
    fontWeight: "bold",
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
  },
  orderCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  orderDetail: {
    fontSize: 16,
    marginBottom: 3,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },

  summaryBlock: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 50,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontFamily: "FiraSansRegular",
  },
  totalPrice: {
    fontSize: 22,
    fontFamily: "FiraSansSemiBold",
    color: Colors.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "FiraSansSemiBold",
  },
});
