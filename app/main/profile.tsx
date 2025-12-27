import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors, Fonts } from "@/shared/tokens";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slices/AuthSlices";
import { useRouter } from "expo-router";

export default function Profile() {
  const dispatch= useDispatch<AppDispatch>();
  const user= useSelector((state:RootState)=>state.auth.user)
  const router = useRouter();

  const handleLogOut=()=>{
    dispatch(logout());
    router.replace('/')
    
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
        </View>
        <View style={styles.user}>
          <Image
            source={require("../../assets/images/noImage.png")}
            style={styles.user__foto}
          />
          <Text style={styles.user__name}>{user?.name}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>router.push('/user/appointments')}>
            <View style={[styles.action, styles.action__my__orders]}>
              <FontAwesome6 name="calendar-alt" size={30} color="black" />
              <Text style={styles.action__text}>Мои записи</Text>
            </View>
          </TouchableOpacity>
          {user?.role ==='MASTER' && <TouchableOpacity>
            <View style={[styles.action, styles.action__my__schedule]}>
              <FontAwesome6
                name="scissors"
                size={30}
                color="black"
                style={styles.action__icon}
              />

              <Text style={styles.action__text}>График записей</Text>
            </View>
          </TouchableOpacity> }
          
          <TouchableOpacity onPress={()=>handleLogOut()}>
            <View style={[styles.action, styles.action__leave]}>
              <FontAwesome
                name="clock-o"
                size={30}
                color="black"
                style={styles.action__icon}
              />
              <Text style={styles.action__text}>Выйти</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    margin: 25,
  },
  header: {
    backgroundColor: Colors.grey,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: Fonts.f23,
    color: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  user: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  user__foto: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  user__name: {
    fontSize: Fonts.f20,
    fontFamily: "FiraSans-Regular",
  },
  actions: {
    paddingHorizontal: 20,
    gap: 10,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  action__my__orders: {},
  action__text: {
    fontSize: Fonts.f20,
    fontFamily: "FiraSans-Regular",
    marginLeft: 20,
  },
  action__icon: {},
  action__my__schedule: {},
  action__leave: {
    backgroundColor: Colors.red,
  },
});
