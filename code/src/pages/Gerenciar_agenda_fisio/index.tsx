import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import { Botao } from '../../components/Botao';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { fetchFisioterapeutaAgenda, updateFisioterapeutaAgenda } from '../../services/consultasService';
import { Calendario } from '../../components/Calendario';

export default function GerenciarHorarios() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [novoHorario, setNovoHorario] = useState('');
  const [horarios, setHorarios] = useState<string[]>([]);
  const [agenda, setAgenda] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const carregarAgenda = async () => {
      try {
        const agendaDoBanco = await fetchFisioterapeutaAgenda(1); // Passar o ID do fisioterapeuta
        setAgenda(agendaDoBanco);
      } catch (error) {
        console.error('Erro ao carregar a agenda:', error);
      }
    };

    carregarAgenda();
  }, []);

  const salvarHorario = async () => {
    if (!dataSelecionada || !novoHorario) {
      Alert.alert('Erro', 'Selecione uma data e insira um horário válido.');
      return;
    }

    const dia = dataSelecionada.toLocaleDateString('pt-BR');
    const horariosAtualizados = agenda[dia] ? [...agenda[dia], novoHorario] : [novoHorario];
    const novaAgenda = { ...agenda, [dia]: horariosAtualizados };

    try {
      await updateFisioterapeutaAgenda(1, novaAgenda); // Passar o ID do fisioterapeuta
      setAgenda(novaAgenda);
      setHorarios(horariosAtualizados);
      setNovoHorario('');
      Alert.alert('Sucesso', 'Horário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar horário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o horário.');
    }
  };

  const removerHorario = async (horario: string) => {
    if (!dataSelecionada) return;

    const dia = dataSelecionada.toLocaleDateString('pt-BR');
    const horariosAtualizados = agenda[dia]?.filter((h) => h !== horario) || [];
    const novaAgenda = { ...agenda, [dia]: horariosAtualizados };

    try {
      await updateFisioterapeutaAgenda(1, novaAgenda); // Passar o ID do fisioterapeuta
      setAgenda(novaAgenda);
      setHorarios(horariosAtualizados);
      Alert.alert('Sucesso', 'Horário removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover horário:', error);
      Alert.alert('Erro', 'Não foi possível remover o horário.');
    }
  };

  const selecionarData = (data: Date) => {
    setDataSelecionada(data);
    const dia = data.toLocaleDateString('pt-BR');
    setHorarios(agenda[dia] || []);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Horários</Text>
      <Calendario dataSelecionada={dataSelecionada} aoAlterarDataHora={selecionarData} />
      <Text style={styles.subtitulo}>Horários do dia selecionado:</Text>
      <FlatList
        data={horarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemHorario}>
            <Text style={styles.textoHorario}>{item}</Text>
            <Botao titulo="Remover" onPress={() => removerHorario(item)} style={styles.botaoRemover} />
          </View>
        )}
      />
      <CampoDeEntrada
        placeholder="Novo horário (ex: 14:00)"
        value={novoHorario}
        onChangeText={setNovoHorario}
      />
      <Botao titulo="Adicionar Horário" onPress={salvarHorario} style={styles.botaoAdicionar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  itemHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoHorario: {
    fontSize: 16,
  },
  botaoRemover: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botaoAdicionar: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
});
