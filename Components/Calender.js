import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Get current date

  const getCurrentMonthData = () => {
    const currentMonth = currentDate.getMonth(); // Get current month (0-indexed)
    const year = currentDate.getFullYear();

    // Calculate first and last day of the current month
    const firstDay = new Date(year, currentMonth, 1);
    const lastDay = new Date(year, currentMonth + 1, 0); // Get last day of previous month

    // Get the starting weekday of the month (0-indexed)
    const startingWeekday = firstDay.getDay();

    // Create an array to hold all days of the month
    const days = [];

    // Add preceding days from the previous month if needed
    for (let i = 0; i < startingWeekday; i++) {
      const prevMonthDay = new Date(year, currentMonth - 1, -startingWeekday + i + 1);
      days.push({ key: 'prev' + i, date: prevMonthDay, isCurrentMonth: false }); // Mark as not current month
    }

    // Add days for the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDay = new Date(year, currentMonth, i);
      days.push({ key: 'current' + i, date: currentDay, isCurrentMonth: true }); // Mark as current month
    }

    return days;
  };

  const renderItem = ({ item }) => {
    const dayStyle = item.isCurrentMonth ? styles.currentDay : styles.otherDay;

    return (
      <View style={dayStyle}>
        <Text>{item.date.getDate()}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={getCurrentMonthData()}
      renderItem={renderItem}
      keyExtractor={item => item.key} // Add keyExtractor
      numColumns={7} // 7 days in a week
    />
  );
};

const styles = StyleSheet.create({
  currentDay: {
    backgroundColor: 'red', // Highlight current month days
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40
  },
  otherDay: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5, // Optional: Reduce opacity for non-current month days
  },
});

export default Calendar;
