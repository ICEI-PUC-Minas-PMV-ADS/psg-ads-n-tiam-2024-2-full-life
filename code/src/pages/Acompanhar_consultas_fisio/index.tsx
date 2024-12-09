import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior';
import { getProximoAgendamentoFisioterapeuta, deleteAgendamento } from '../../services/agendamentoService';
import { getNomeFisioterapeuta } from '../../services/fisioterapeutaService';

export default function ConsultaFisioterapeuta() {
  const [nomeFisioterapeuta, setNomeFisioterapeuta] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<any | null>(null);
  const [data_hora, setDataHora] = useState<string | null>(null);
  const [paciente, setPaciente] = useState<string | null>(null);
  const [especialidade, setEspecialidade] = useState<string | null>(null);
  const [statusAgendamento, setStatusAgendamento] = useState<string | null>(null);

  useEffect(() => {
    const fetchFisioterapeutaData = async () => {
      try {
        const nomeFisio = await getNomeFisioterapeuta();
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
      setAgendamento(agendamentoData);

      if (agendamentoData) {
        setDataHora(agendamentoData.data_hora);
        setPaciente(agendamentoData.nome_paciente);
        setEspecialidade(agendamentoData.especialidade);
        setStatusAgendamento(agendamentoData.status);
      } else {
        setAgendamento(null);
      }
    } catch (error) {
      console.error('Erro ao buscar próximo agendamento:', error);
      setAgendamento(null);
    }
  };

  useEffect(() => {
    fetchProximoAgendamento();
  }, []);

  function finalizarConsulta() {
    Alert.alert('Consulta finalizada com sucesso!');
  }

  function deletarAgendamento() {
    if (agendamento?.id) {
      deleteAgendamento(agendamento.id);
      fetchProximoAgendamento();
      Alert.alert('Consulta cancelada com sucesso!');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BarraSuperior titulo="FullLife" />

        <View style={styles.content}>
          <Text style={styles.label}>Fisioterapeuta</Text>
          <TextInput style={styles.input} value={nomeFisioterapeuta ?? ''} editable={false} />

          <Text style={styles.label}>Próximo Agendamento</Text>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dateContainer}>
                {agendamento ? (
                  <>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateText}>
                        {new Date(data_hora || '').getDate()}
                      </Text>
                      <Text style={styles.dateMonth}>
                        {new Date(data_hora || '').toLocaleString('default', { month: 'short' })}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>
                        {new Date(data_hora || '').toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text style={styles.text}>Paciente: {paciente}</Text>
                      <Text style={styles.text}>Especialidade: {especialidade}</Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.text}>Nenhum agendamento encontrado</Text>
                )}
              </View>
            </Card.Content>
          </Card>

          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={statusAgendamento ?? 'Sem agendamento'}
            editable={false}
          />

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
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  finalizeButton: {
    flex: 1,
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