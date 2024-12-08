import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { getRecomendacoesPorPaciente } from '../../services/exerciciosService';
import { getId } from '../../services/pacienteService';

interface Exercicio {
  id: number;
  nome: string;
  observacoes: string;
}

export default function ExerciciosPaciente() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [observacoes, setObservacoes] = useState<string>('');

  useEffect(() => {
    const carregarRecomendacoes = async () => {
      try {
        const idPaciente = await getId();
        if (!idPaciente) {
          console.error("Usuário não logado ou id inválido.");
          return;
        }

        const recomendacao = await getRecomendacoesPorPaciente(idPaciente);

        if (recomendacao) {
          setExercicios(recomendacao.exercicios);
        } else {
          console.log("Nenhuma recomendação encontrada.");
        }
      } catch (error) {
        console.error("Erro ao carregar recomendações:", error);
      }
    };

    carregarRecomendacoes();
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    const exercicioSelecionado = exercicios.find((exercicio) => exercicio.nome === option);
    setObservacoes(exercicioSelecionado?.observacoes || 'Nenhuma observação disponível.');
  };

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="FullLife" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Condutas de Tratamento</Text>
        <CampoDeEntrada
          placeholder="Selecione um exercício"
          value={selectedOption}
          onChangeText={handleOptionChange}
          options={exercicios.map((exercicio) => exercicio.nome)}
        />
        <View style={styles.card}>
          <Text style={styles.subtitulo}>Observações:</Text>
          <Text style={styles.texto}>{observacoes}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});
