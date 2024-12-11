import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior';
import { getProximoAgendamentoFisioterapeuta, deleteAgendamento } from '../../services/agendamentoService';
import { getNomeFisioterapeuta } from '../../services/fisioterapeutaService';
import { getNomePaciente } from '../../services/pacienteService';
import { addConsulta } from '../../services/consultasService';

export default function ConsultaFisioterapeuta() {
  const [nomeFisioterapeuta, setNomeFisioterapeuta] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<any | null>(null);
  const [nomePaciente, setNomePaciente] = useState<string | null>(null);

  useEffect(() => {
    const fetchFisioterapeutaData = async () => {
      try {
        const nomeFisio = await getNomeFisioterapeuta(2);
        setNomeFisioterapeuta(nomeFisio || 'Fisioterapeuta');
      } catch (error) {
        console.error('Erro ao buscar nome do fisioterapeuta:', error);
        setNomeFisioterapeuta('Fisioterapeuta');
      }
    };
    fetchFisioterapeutaData();
  }, []);

  const fetchProximoAgendamento = async () => {
    try {
      const agendamentoData = await getProximoAgendamentoFisioterapeuta();
  
      if (agendamentoData) {
        setAgendamento(agendamentoData);
        const nomePacienteAux = await getNomePaciente(agendamentoData.id_paciente);
        setNomePaciente(nomePacienteAux || 'Paciente');
      } else {
        setAgendamento(null);
        setNomePaciente(null);
      }
    } catch (error) {
      console.error('Erro ao buscar próximo agendamento:', error);
      setAgendamento(null);
      setNomePaciente(null);
    }
  };
  

  useEffect(() => {
    fetchProximoAgendamento();
  }, []);

  const finalizarConsulta = async () => {
    if (agendamento) {
      try {
        const novaConsulta = {
          id_fisioterapeuta: agendamento.id_fisioterapeuta,
          id_paciente: agendamento.id_paciente,
          data_hora: agendamento.data_hora,
          observacoes: 'Consulta Finalizada com sucesso!',
        };
  
        await addConsulta(novaConsulta);
        await deleteAgendamento(agendamento.id);
  
        Alert.alert('Consulta finalizada com sucesso!');
        fetchProximoAgendamento();
      } catch (error) {
        console.error('Erro ao finalizar consulta:', error);
        Alert.alert('Erro', 'Não foi possível finalizar a consulta.');
      }
    } else {
      Alert.alert('Nenhum agendamento disponível para finalizar.');
    }
  };

  const deletarAgendamento = async () => {
    if (agendamento?.id) {
      try {
        await deleteAgendamento(agendamento.id);
        Alert.alert('Consulta cancelada com sucesso!');
      } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        Alert.alert('Erro', 'Não foi possível cancelar a consulta.');
      }
      fetchProximoAgendamento();
    } else {
      Alert.alert('Nenhum agendamento disponível para cancelar.');
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BarraSuperior titulo="FullLife" />
        <View style={styles.content}>
          <Text style={styles.label}>Fisioterapeuta</Text>
          <TextInput style={styles.input} value={nomeFisioterapeuta || ''} editable={false} />
          <Text style={styles.label}>Próximo Agendamento</Text>
          <Card style={styles.card}>
          <Card.Content>
              <View>
                {agendamento ? (
                  <>
                    <Text style={styles.text}>
                      Data e Hora: {new Date(agendamento.data_hora.toDate()).toLocaleString('pt-BR')}
                    </Text>
                    <Text style={styles.text}>Paciente: {nomePaciente || 'Paciente não identificado'}</Text>
                    <Text style={styles.text}>Especialidade: {agendamento.especialidade}</Text>
                  </>
                ) : (
                  <Text style={styles.text}>Nenhum agendamento encontrado</Text>
                )}
              </View>
            </Card.Content>

          </Card>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={deletarAgendamento}>
              <Text style={styles.cancelButtonText}>Cancelar consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalizeButton} onPress={finalizarConsulta}>
              <Text style={styles.finalizeButtonText}>Finalizar consulta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 20 },
  card: { marginBottom: 20 },
  text: { fontSize: 14, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: {
    marginRight: 3, 
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
  finalizeButton: {
    marginLeft: 3, 
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  finalizeButtonText: { 
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
});
