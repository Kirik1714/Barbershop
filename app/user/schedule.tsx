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

export default function Schedule() {
  // Убираем анимации, оставляем только флаг для скрытия лоадера
  const [loading, setLoading] = useState(true);
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    // Используем setImmediate или минимальный тиков, чтобы просто дать JS один кадр на отрисовку
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  const eventsByDate = useMemo(() => ({
    [todayStr]: [
      {
        id: "1",
        start: `${todayStr} 10:00:00`,
        end: `${todayStr} 10:45:00`,
        title: "Алексей",
        summary: "Мужская стрижка",
        color: Colors.milk,
      },
    ],
  }), [todayStr]);

  const renderEvent = useCallback((event: any) => (
    <View style={[styles.event, { backgroundColor: event.color }]}>
      <Text style={styles.event__title}>{event.title}</Text>
      <Text style={styles.event__summary}>{event.summary}</Text>
    </View>
  ), []);

  const timelineProps = useMemo(() => ({
    format24h: true,
    start: 8,
    end: 22,
    unavailableHours: [{ start: 0, end: 8 }, { start: 22, end: 24 }],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    renderEvent: renderEvent,
    scrollToNow: true, 
  }), [renderEvent]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <ReturnButton />
          <Text style={styles.header__title}>График работы</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
    
        <CalendarProvider date={todayStr}>
          <ExpandableCalendar
            firstDay={1}
            allowShadow={false}
            markedDates={{ [todayStr]: { marked: true, dotColor: Colors.primary } }}
          />
          <View style={styles.timelineWrapper}>
            <TimelineList
              events={eventsByDate}
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