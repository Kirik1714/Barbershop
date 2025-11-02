import Logo from "@/assets/images/Logo";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { Colors } from "@/shared/tokens";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Registration() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

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
                  value={email}
                  placeholder="Имя"
                  onChangeText={setEmail}
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
                title="Зарегистрироваться"
                onPress={() => console.log("/Registration")}
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
