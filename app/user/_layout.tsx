
import { Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);
  
export default function UserRootLayout() {

   
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="appointments" />
      <Stack.Screen name="schedule" />
    </Stack>
  );
}
