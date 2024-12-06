import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';

export default function AdicionarExercicios() {
  const [anatomia, setAnatomia] = useState('');
  const [exercicio, setExercicio] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const anatomias = ['Cabeça', 'Braço', 'Perna']; 
  const exercicios = ['Flexão', 'Agachamento', 'Abdominal'];

  const handleCadastrarExercicio = () => {
    console.log('Exercício cadastrado:', anatomia, exercicio, observacoes);
  };

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="FullLife" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Condutas de Tratamento</Text>

        <Text style={styles.label}>Selecionar anatomia humana</Text>
        <CampoDeEntrada
          placeholder="Selecione a anatomia"
          value={anatomia}
          onChangeText={setAnatomia}
          options={anatomias}
        />

        <Text style={styles.label}>Selecionar o exercício desejado</Text>
        <CampoDeEntrada
          placeholder="Selecione o exercício"
          value={exercicio}
          onChangeText={setExercicio}
          options={exercicios}
        />

        <TouchableOpacity style={styles.buttonAdicionar} onPress={handleCadastrarExercicio}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Observações</Text>
        <View style={styles.observacoesBox}>
          <TextInput
            style={styles.observacoesText}
            placeholder="Observações serão exibidas aqui"
            value={observacoes}
            editable={false}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.buttonCadastrar} onPress={handleCadastrarExercicio}>
          <Text style={styles.buttonText}>Cadastrar exercício</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  buttonAdicionar: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonCadastrar: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  observacoesBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
    height: 120,
    marginBottom: 16,
  },
  observacoesText: {
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
});
