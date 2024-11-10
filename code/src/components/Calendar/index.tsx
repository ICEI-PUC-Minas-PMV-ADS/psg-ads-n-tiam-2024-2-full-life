import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CalendarProps {
  agendamentos: { [date: string]: string[] };
  onDateTimeChange: (date: Date, time: string) => void;
}

export function Calendar({ agendamentos, onDateTimeChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const year = prevMonth.getFullYear();
      const month = prevMonth.getMonth();
      return new Date(year, month - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const year = prevMonth.getFullYear();
      const month = prevMonth.getMonth();
      return new Date(year, month + 1, 1);
    });
  };

  const renderCalendarHeader = () => {
    const monthName = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return (
      <View style={styles.calendarHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDaysRow}>
          <Text style={styles.weekDay}>S</Text>
          <Text style={styles.weekDay}>T</Text>
          <Text style={styles.weekDay}>Q</Text>
          <Text style={styles.weekDay}>Q</Text>
          <Text style={styles.weekDay}>S</Text>
          <Text style={styles.weekDay}>S</Text>
          <Text style={styles.weekDay}>D</Text>
        </View>
      </View>
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const hasAppointments = agendamentos[formattedDate]?.length > 0;

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayCell,
            hasAppointments && styles.availableDay,
            selectedDate?.getDate() === i &&
              selectedDate?.getMonth() === currentMonth.getMonth() &&
              selectedDate?.getFullYear() === currentMonth.getFullYear() &&
              styles.selectedDay,
          ]}
          onPress={() => {
            if (hasAppointments) {
              setSelectedDate(date);
              const availableTimes = agendamentos[formattedDate];
              if (availableTimes && availableTimes.length > 0) {
                onDateTimeChange(date, availableTimes[0]);
              }
            }
          }}
        >
          <Text
            style={[
              styles.dayText,
              hasAppointments && styles.availableDayText,
              selectedDate?.getDate() === i &&
                selectedDate?.getMonth() === currentMonth.getMonth() &&
                selectedDate?.getFullYear() === currentMonth.getFullYear() &&
                styles.selectedDayText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return <View style={styles.calendarGrid}>{days}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {renderCalendarHeader()}
        {renderCalendarDays()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  calendarHeader: {
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  navButton: {
    paddingHorizontal: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  weekDay: {
    width: 30,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  availableDay: {
    backgroundColor: '#e8f5e9',
  },
  availableDayText: {
    color: '#4CAF50',
    fontWeight: '500',
    paddingBottom: 12,
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
