import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { saveAnamneseFisioterapeuta } from '../../services/anamneseService';
import { Pacientes } from '../../services/pacienteService';

interface Props {
    idPacienteDoBanco: number;
  }

  export function AnamneseFormFisioterapeuta({ idPacienteDoBanco }: Props) {
  const [formData, setFormData] = useState({
    diagnostico: '',
    historiaClinica: '',
    queixaPrincipal: '',
    tdaH: '',
    hbp: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const salvarAnamnese = async () => {
    try {
      const id = await saveAnamneseFisioterapeuta(formData, idPacienteDoBanco);
      Alert.alert('Sucesso', `Anamnese salva com sucesso! ID: ${id}`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a anamnese. Tente novamente.');
    }
  };

  return (
    <View style={styles.card}>
      {Object.keys(formData).map((key, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={formData[key as keyof typeof formData]}
          onChangeText={(text) => handleInputChange(key, text)}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={salvarAnamnese}>
        <Text style={styles.buttonText}>Salvar Anamnese</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
