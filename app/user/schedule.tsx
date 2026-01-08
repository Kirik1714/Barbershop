import React, { useMemo, useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
} from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "@/shared/components/ReturnButton";
import { Colors, Fonts } from "@/shared/tokens";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearSchedule, getScheduleByMaster } from "@/store/slices/MastersSlices";

export default function Schedule() {
  const { masterId } = useLocalSearchParams();
  const dispatch=useDispatch<AppDispatch>()


  const { schedule, loading } = useSelector(
    (state: RootState) => state.masters
  );
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [currentMonth, setCurrentMonth] = useState(todayStr.substring(0, 7));

  

  useEffect(() => {
    if (masterId) {
      dispatch(getScheduleByMaster({masterId:String(masterId),month:currentMonth}))
    }
    return () => {
      dispatch(clearSchedule());
    };
  }, [masterId, currentMonth, dispatch]);
  

  const onDateChanged = useCallback((date:string)=>{
    const newMonts = date.substring(0,7);
    if(newMonts !==currentMonth){
      setCurrentMonth(newMonts)
   
    }
  },[currentMonth])



  const renderEvent = useCallback(
    (event: any) => (
      <View style={[styles.event, { backgroundColor: event.color }]}>
        <Text style={styles.event__title}>{event.title}</Text>
        <Text style={styles.event__summary}>{event.summary}</Text>
      </View>
    ),
    []
  );

  const timelineProps = useMemo(
    () => ({
      format24h: true,
      start: 8,
      end: 22,
      unavailableHours: [
        { start: 0, end: 8 },
        { start: 22, end: 24 },
      ],
      overlapEventsSpacing: 8,
      rightEdgeSpacing: 24,
      renderEvent: renderEvent,
      scrollToNow: true,
    }),
    [renderEvent]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <ReturnButton />
          <Text style={styles.header__title}>График работы</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <CalendarProvider date={todayStr} onDateChanged={onDateChanged}>
          <ExpandableCalendar
            firstDay={1}
            allowShadow={false}
            markedDates={{
              [todayStr]: { marked: true, dotColor: Colors.primary },
            }}
          />
          <View style={styles.timelineWrapper}>
            <TimelineList
              events={schedule || {}}
              showNowIndicator
              scrollToFirst
              initialTime={{ hour: 9, minutes: 0 }}
              timelineProps={timelineProps}
            />
          </View>
        </CalendarProvider>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headerWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    zIndex: 10,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 20 },
  header__title: { fontSize: Fonts.f23, fontFamily: "FiraSans-Regular" },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    zIndex: 99,
  },
  timelineWrapper: { flex: 1 },
  event: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  event__title: {
    fontSize: Fonts.f14,
    fontWeight: "bold",
    color: Colors.black,
  },
  event__summary: { fontSize: Fonts.f12, color: "#666" },
});
