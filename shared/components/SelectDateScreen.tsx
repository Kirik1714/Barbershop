import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { Colors } from "../tokens";

export default function SelectDateScreen() {
  const screenWidth = Dimensions.get("window").width;
  const horisontalPadding = 20 * 2;
  const calendarWidth = screenWidth - horisontalPadding;
  const [selected,setSelected] = useState("");

  useEffect(()=>{
    const today = new Date().toISOString().split("T")[0];
    setSelected(today)
    
  },[])
  return (
    <View style={styles.container}>
      <CalendarProvider date={"2025-11-07"}>
        <View style={{ height: 400, alignSelf: "center" }}>
          <Calendar
            firstDay={1}
            hideArrows={false}
            style={{
              width: calendarWidth,
            }}
            onDayPress={(day) => setSelected(day.dateString)}

            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: Colors.primary,
                selectedTextColor: Colors.white,
              },
            }}
            theme={{
              backgroundColor: Colors.white,
              calendarBackground:Colors.white,
              textSectionTitleColor: Colors.black,
              dayTextColor: Colors.black,
              todayTextColor: Colors.primary,
              selectedDayBackgroundColor: Colors.primary,
              selectedDayTextColor: Colors.white,
              monthTextColor: Colors.black,
              arrowColor: Colors.black,
              textDayFontSize: 20,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 15,
            }}
          />
        </View>
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    
  },
});
