import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { listarAnatomias, listarExercicios, adicionarExercicio, adicionarRecomendacaoExercicio } from '../../services/exerciciosService';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarExercicios() {
  const [anatomias, setAnatomias] = useState<string[]>([]);
  const [exercicios, setExercicios] = useState<{ id: number; Nome: string; Anatomia: string; Observacoes: string }[]>([]);
  const [anatomia, setAnatomia] = useState('');
  const [exercicio, setExercicio] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const carregarAnatomias = async () => {
      try {
        const listaAnatomias = await listarAnatomias();
        setAnatomias(listaAnatomias);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar anatomias. Tente novamente.');
      }
    };

    const carregarExercicios = async () => {
      try {
        const listaExercicios = await listarExercicios(anatomia);
        if (listaExercicios.length === 0) {
          Alert.alert('Atenção', 'Não há exercícios cadastrados para esta anatomia.');
        }
        setExercicios(listaExercicios);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar exercícios. Tente novamente.');
      }
    };

    carregarAnatomias();
    carregarExercicios();
  }, [anatomia]);


  const handleExercicioChange = (value: string) => {
      setExercicio(value);
      const exercicioSelecionado = exercicios.find((ex) => ex.Nome === value);
  
    if (exercicioSelecionado) {
      setObservacoes(exercicioSelecionado.Observacoes);
  
      const exercicioId = exercicioSelecionado.id;
  
      if (!exerciciosSelecionados.includes(exercicioId)) {
        setExerciciosSelecionados((prevSelecionados) => {
          const novosSelecionados = [...prevSelecionados, exercicioId];
          return novosSelecionados;
        });
      } else {
        console.log("Exercício já selecionado:", exercicioId);
      }
    } else {
      console.log("Exercício não encontrado.");
    }
  };
  
  
  

  const handleAdicionarRecomendacao = async () => {
    if (exerciciosSelecionados.length > 0) {
      console.log("aaaaaaa");
      const recomendacao = {
        id: Date.now(),
        id_paciente: null,  // Ainda não implementado
        exercicios: exerciciosSelecionados.map((id) => {
          const exercicio = exercicios.find((ex) => ex.id === id);
          return {
            id,
            nome: exercicio ? exercicio.Nome : '',
            observacoes: exercicio ? exercicio.Observacoes : '',
          };
        }),
      };
  
      try {
        await adicionarRecomendacaoExercicio(recomendacao);
        Alert.alert('Sucesso', 'Recomendação de exercícios adicionada!');
        setExerciciosSelecionados([]);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao adicionar recomendação. Tente novamente.');
      }
    } else {
      Alert.alert('Erro', 'Selecione ao menos um exercício.');
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
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
            onChangeText={handleExercicioChange}
            options={exercicios.map((ex) => ex.Nome)}
          />

          <Text style={styles.label}>Observações</Text>
          <View style={styles.observacoesBox}>
            <Text style={styles.observacoesText}>
              {observacoes || 'Nenhuma observação disponível.'}
            </Text>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar} onPress={handleAdicionarRecomendacao}>
            <Text style={styles.buttonText}>Adicionar exercício</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegistrarNovo} onPress={() => navigation.navigate('CadastroExercicios' as never)}>
            <Text style={styles.buttonText}>Registrar novo exercício</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffff",
  },
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
  observacoesBox: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  observacoesText: {
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
  },
  buttonCadastrar: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonRegistrarNovo: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
