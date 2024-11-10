import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SeletorEspecialidadeProps {
  especialidades: string[];
  aoMudarEspecialidade: (especialidade: string) => void;
}

export function SeletorEspecialidade({ especialidades, aoMudarEspecialidade }: SeletorEspecialidadeProps) {
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');

  const handleMudarEspecialidade = (especialidade: string) => {
    setEspecialidadeSelecionada(especialidade);
    aoMudarEspecialidade(especialidade);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Especialidade</Text>
      <View style={styles.containerPicker}>
        <Picker
          selectedValue={especialidadeSelecionada}
          onValueChange={handleMudarEspecialidade}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma especialidade" value="" />
          {especialidades.map((especialidade) => (
            <Picker.Item key={especialidade} label={especialidade} value={especialidade} />
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
  rotulo: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  containerPicker: {
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

