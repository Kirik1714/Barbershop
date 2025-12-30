import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts } from "../tokens";

interface AppointmentSwitcherProps{
  onTabChange:(tab:"upcoming" | "past")=>void;
}

const { width } = Dimensions.get("window");
const SWITCHER_WIDTH = width - 40;
const TAB_WIDTH = SWITCHER_WIDTH / 2;

export default function AppointmentSwitcher({onTabChange}:AppointmentSwitcherProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const handleTabPress = (tab: "upcoming" | "past") => {
    setActiveTab(tab)
    onTabChange(tab)
    Animated.spring(translateX, {
      toValue: tab === "upcoming" ? 0 : TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.switcherBackground}>
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              transform: [{ translateX }],
            },
          ]}
        />

        <TouchableOpacity
          style={styles.tab}
          activeOpacity={1}
          onPress={() => handleTabPress("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Предстоящие
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          activeOpacity={1}
          onPress={() => handleTabPress("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Прошедшие
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical:20,
   
  },
  switcherBackground: {
    width: SWITCHER_WIDTH,
    flexDirection: "row",
    height: 50,
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
     backgroundColor:Colors.white
  },
  activeIndicator: {
    position: "absolute",
    width: TAB_WIDTH,
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  tab: {
  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  tabText: {
    fontSize: Fonts.f17,
    fontFamily: "FiraSans-Regular",
    color: Colors.black,
  },
  activeTabText: {
    color:Colors.white,
    fontSize: Fonts.f17,
    fontFamily: "FiraSans-Regular",
  },
});
