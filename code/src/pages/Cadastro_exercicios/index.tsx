import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { listarAnatomias, adicionarExercicio } from '../../services/exerciciosService';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';

export default function CadastroTratamento() {
  const [anatomia, setAnatomia] = useState('');
  const [nome, setNome] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [anatomias, setAnatomias] = useState<string[]>([]);

  useEffect(() => {
    const carregarAnatomias = async () => {
      try {
        const listaAnatomias = await listarAnatomias();
        setAnatomias(listaAnatomias);
      } catch (error) {
        console.log('Erro ao carregar anatomias. Tente novamente.');
      }
    };

    carregarAnatomias();
  }, []);

  const handleCadastro = async () => {
    try {
      const id = await adicionarExercicio(anatomia, nome, observacoes);
      alert(`Exercício cadastrado com sucesso!`);
      setAnatomia('');
      setNome('');
      setObservacoes('');
    } catch (error) {
      alert('Erro ao cadastrar o exercício. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="FullLife" />
      <View style={styles.card}>
        <Text style={styles.title}>Cadastrar novo tratamento</Text>
        <Text style={styles.label}>Selecione a anatomia</Text>
        <CampoDeEntrada
          placeholder="Selecione a anatomia"
          value={anatomia}
          onChangeText={setAnatomia}
          options={anatomias}
        />
        <Text style={styles.label}>Digite o nome do exercício a ser cadastrado</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={styles.textarea}
          placeholder=""
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />
        <Button title="Cadastrar" color="#4CAF50" onPress={handleCadastro} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
});
