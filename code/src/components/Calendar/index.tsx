import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface CalendarProps {
  agendamentos: { [date: string]: string[] };
  onDateTimeChange: (date: Date, time: string) => void;
}

function Calendar({ agendamentos, onDateTimeChange }: CalendarProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    if (agendamentos[formattedDate]) {
      setSelectedDate(date);
      setAvailableTimes(agendamentos[formattedDate]);
      setTimePickerVisibility(true);
    } else {
      alert("Não há horários disponíveis para esta data.");
    }
    hideDatePicker();
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onDateTimeChange(selectedDate, time);
    }
    setTimePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateField}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Selecione uma data'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Modal visible={isTimePickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um horário</Text>
            <FlatList
              data={availableTimes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.timeOption}
                  onPress={() => handleTimeSelect(item)}
                >
                  <Text style={styles.timeText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dateField: {
    height: 40,
    borderColor: '#9E9E9E',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  dateText: {
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Calendar;
