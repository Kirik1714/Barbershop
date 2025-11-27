import Logo from "@/assets/images/Logo";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { Colors } from "@/shared/tokens";
import { registerUser } from "@/store/slices/AuthSlices";
import { AppDispatch, RootState } from "@/store/store";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Registration() {
  const dispatch =useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error,token  } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const handleRegistration=()=>{
    if (!name || !email || !password || !confirmedPassword) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    if (password !== confirmedPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }
        dispatch(registerUser({ name, email, password } ));

  }
  useEffect(()=>{
        if (token) {
    router.replace("/main");
  }
  },[token])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView edges={['bottom', 'left', 'right',]}style={{ flex: 1,  justifyContent: 'center' }}>
          <Logo />

          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.inputs}>
                <Input
                  value={name}
                  placeholder="Имя"
                  onChangeText={setName}
                />
                  <Input
                  value={email}
                  placeholder="Почта"
                  onChangeText={setEmail}
                />
        

                <Input
                  value={password}
                  placeholder="Пароль"
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Input
                  value={confirmedPassword}
                  placeholder="Подтверждение пароля"
                  onChangeText={setConfirmedPassword}
                  secureTextEntry
                />
              </View>

              <Button
                title={loading ? "Регистрация..." : "Зарегистрироваться"}
                onPress={handleRegistration}
                // disabled={loading}
              />
            </View>

            <View>
              <Link href="/" style={styles.option}>
                Есть аккаунта?
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 55,
    gap: 40,
  },
  inputs: {
    gap: 25,
  },
  form: {
    gap: 35,
  },

  option: {
    color: Colors.grey,
    fontFamily: "FiraSans-Regular",
  },
});
