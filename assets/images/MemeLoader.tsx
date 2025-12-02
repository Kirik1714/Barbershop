import { Image, StyleSheet, View } from "react-native";

export default function MemeLoader() {
  return (
    <View style={styles.container}>
      <Image source={require("../images/loading.gif")} style={styles.gif} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
