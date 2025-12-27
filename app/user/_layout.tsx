import { Stack } from "expo-router";

export default function UserRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="appointments" />
      <Stack.Screen name="schedule" />
    </Stack>
  );
}
