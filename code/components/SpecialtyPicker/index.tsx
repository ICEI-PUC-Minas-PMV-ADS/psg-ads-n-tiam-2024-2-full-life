import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface SpecialtyPickerProps {
  specialties: string[];
  onSpecialtyChange: (specialty: string) => void;
}

function SpecialtyPicker({ specialties, onSpecialtyChange }: SpecialtyPickerProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    onSpecialtyChange(specialty);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Especialidade</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSpecialty}
          onValueChange={handleSpecialtyChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma especialidade" value="" />
          {specialties.map((specialty) => (
            <Picker.Item key={specialty} label={specialty} value={specialty} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  pickerContainer: {
    borderColor: '#9E9E9E',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  picker: {
    height: 40,
    width: '100%',
  },
});

export default SpecialtyPicker;
