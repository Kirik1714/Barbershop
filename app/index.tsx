import Logo from "@/assets/images/Logo";
import Input from "@/shared/components/Input";
import { Colors } from "@/shared/tokens";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/shared/components/Button";
import {
  
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}

    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView edges={['bottom', 'left', 'right',]}style={{ flex: 1,  justifyContent: 'center' }} >
            
          <Logo  />
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.inputs}>
           
             
               
                 <Input
                  value={email}
                  placeholder="Логин"
                  onChangeText={setEmail}
                />
                
                
                <Input
                  value={password}
                  placeholder="Пароль"
                  onChangeText={setPassword}
                  secureTextEntry
                />
                
              </View>

              <Button
                title="Войти"
                onPress={() => router.push("/Registration")}
              />
            </View>
            <View style={styles.variousSignIn}>
              <View>
                <Link href="/main" style={styles.option}>
                  Зайти как гость?
                </Link>
              </View>
              <View>
                <Link href="/Registration" style={styles.option}>
                  Нет аккаунта?
                </Link>
              </View>
            </View>
          </View>

        </SafeAreaView >
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center' ,
    paddingHorizontal: 55,
    gap: 40,
  },
  inputs: {
    gap: 25,
  },
  form: {

    gap: 35,
  },
  variousSignIn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    color: Colors.grey,
    fontFamily: "FiraSans-Regular",
  },
});
