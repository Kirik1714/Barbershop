import { Colors } from "@/shared/tokens";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); 


export default function RootLayout() {
  const [loaded] = useFonts({
    FiraSansRegular: require("../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansSemiBold: require("../assets/fonts/FiraSans-SemiBold.ttf")


  })
  useEffect(()=>{

    if(loaded){
      SplashScreen.hideAsync()
    }
  },[loaded])


  return (
    <SafeAreaProvider>
      
      <View style={styles.container}>
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, 
        justifyContent: 'flex-start',
  },
  
});
