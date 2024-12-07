import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior';
import { getLoggedInPatient } from '../../services/pacienteService';
import { getProximoAgendamento } from '../../services/agendamentoService';

export default function AcompanharConsultas() {
  const [userName, setUserName] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteLogado = await getLoggedInPatient();

        if (pacienteLogado) {
          setUserName(pacienteLogado.nome || 'Paciente');

          const proximoAgendamento = await getProximoAgendamento(pacienteLogado.id);
          if (proximoAgendamento) {
            setAgendamento({
              ...proximoAgendamento,
              data_hora: proximoAgendamento.data_hora.toDate(), 
            });
          } else {
            setAgendamento(null);
          }
        } else {
          console.warn("Paciente não encontrado.");
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BarraSuperior titulo="FullLife" />

        <View style={styles.content}>
          <Text style={styles.label}>Paciente</Text>
          <TextInput style={styles.input} value={userName ?? 'Paciente'} editable={false} />

          <Text style={styles.label}>Data e profissional</Text>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dateContainer}>
                {agendamento ? (
                  <>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateText}>
                        {new Date(agendamento.data_hora).getDate()}
                      </Text>
                      <Text style={styles.dateMonth}>
                        {new Date(agendamento.data_hora).toLocaleString('default', { month: 'short' })}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>
                        {new Date(agendamento.data_hora).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text style={styles.text}>Fisioterapeuta {agendamento.id_fisioterapeuta}</Text>
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
            value={agendamento?.status ?? 'Sem agendamento'}
            editable={false}
          />

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar consulta</Text>
          </TouchableOpacity>
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
