import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior';

export default function AcompanharConsultas() {
  return (
    <View style={styles.container}>
      <BarraSuperior titulo='FullLife' />
      
      <View style={styles.content}>
        <Text style={styles.label}>Paciente</Text>
        <TextInput style={styles.input} value="Augusto Farfus" editable={false} />
        
        <Text style={styles.label}>Data e profissional</Text>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.dateContainer}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>04</Text>
                <Text style={styles.dateMonth}>Out</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  Sexta-feira, 04/10/2024 às 10:40
                </Text>
                <Text style={styles.text}>
                  Fisioterapeuta Marcelo Dias
                </Text>
                <Text style={styles.text}>
                  Fisioterapia esportiva
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Text style={styles.label}>Status</Text>
        <TextInput style={styles.input} value="Em andamento" editable={false} />
        
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar consulta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  dateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  dateMonth: {
    color: '#fff',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
