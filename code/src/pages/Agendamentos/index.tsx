import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, FlatList, TouchableOpacity } from 'react-native';
import { TopBar } from '../../components/TopBar';
import { Calendar } from '../../components/Calendar';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';

export default function Scheduling() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [specialty, setSpecialty] = useState('');
  const [horario, setHorario] = useState('');

  const specialties = ['Coluna', 'Quiropraxia', 'Ortopedia', 'Pediatria'];

  type datas = {
    [chave: string]: string[];
  };

  const agendamentos: { [chave: string]: string[] } = {
    '09/09/2024': ['09:00', '10:00', '14:00'],
    '15/09/2024': ['09:00', '10:00', '14:00', '15:00'],
    '16/09/2024': ['08:00', '11:00', '13:00', '16:00'],
    '17/09/2024': ['09:30', '10:30', '14:30', '15:30']
  };
  

  const handleDateTimeChange = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    console.log('Agendamento confirmado:', {
      date: selectedDate,
      time: selectedTime,
      specialty,
    });
  };
  
  function selectDate(selectDate: Date | null): any {
    if (!selectDate) {
      return []; 
    }

    const day = String(selectDate.getDate()).padStart(2, '0');
    const month = String(selectDate.getMonth() + 1).padStart(2, '0');
    const year = selectDate.getFullYear();

    const date = `${day}/${month}/${year}`;

    return agendamentos[date] || [];
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="FullLife" onBackPress={() => {}} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Realizar agendamento:</Text>
        </View>

        <View style={styles.sectionCalendar}>
          <Calendar agendamentos={agendamentos} onDateTimeChange={handleDateTimeChange} />
        </View>

        <Text style={styles.headerText}>Selecionar Hora:</Text>
        <View style={styles.sectionHora}>
          <InputField
            placeholder="Horários"
            value={horario}
            onChangeText={setHorario}
            options={selectDate(selectedDate)}
          />
        </View>

        <Text style={styles.headerText}>Especialidade:</Text>
        <View style={styles.sectionSpecialty}>
          <InputField
            placeholder="Especialidade"
            value={specialty}
            onChangeText={setSpecialty}
            options={specialties}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.buttonCancel} title="Cancelar" onPress={() => {}} textStyle={styles.buttonTextCancel} />
          <Button style={styles.buttonConfirm} title="Confirmar" onPress={handleConfirm} textStyle={styles.buttonTextConfirm} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 17,
    color: '#333',
  },
  sectionCalendar: {
    marginBottom: 10,
  },
  sectionHora: {
    
  },
  sectionSpecialty: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
    gap: 20,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  buttonConfirm: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonTextCancel: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextConfirm: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
