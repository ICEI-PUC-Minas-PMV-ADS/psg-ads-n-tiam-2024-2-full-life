import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior';
import { getProximoAgendamento, deleteAgendamento } from '../../services/agendamentoService';
import { getId, getNomePaciente } from '../../services/pacienteService';
import { getNomeFisioterapeuta } from '../../services/fisioterapeutaService';

export default function AcompanharConsultas() {
  const [userName, setUserName] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<any | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [data_hora, setDataHora] = useState<string | null>(null);
  const [nomeFisioterapeuta, setNomeFisioterapeuta] = useState<string | null>(null);
  const [especialidade, setEspecialidade] = useState<string | null>(null);
  const [statusAgendamento, setStatusAgendamento] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const idPaciente = await getId();
        setUserId(idPaciente || 0);
      } catch (error) {
        console.error("Erro ao buscar ID do paciente:", error);
        setUserId(0);
      }
    };
  
    fetchUserId();
}, []);
  
  

useEffect(() => {
    const fetchUserName = async () => {
        if (userId) { 
            try {
                const nomePaciente = await getNomePaciente(userId);
                setUserName(nomePaciente || 'Paciente');
            } catch (error) {
                console.error("Erro ao buscar nome do paciente:", error);
                setUserName('Paciente');
            }
        }
    };

    fetchUserName();
}, [userId]);

const fetchProximoAgendamento = async () => {
  if (userId) { 
    try {
      const agendamentoData = await getProximoAgendamento(userId);
      setAgendamento(agendamentoData);

      if (agendamentoData) {
        setDataHora(agendamentoData.data_hora);
        setEspecialidade(agendamentoData.especialidade);
        setStatusAgendamento(agendamentoData.status);

        const nomeFisio = await getNomeFisioterapeuta(agendamentoData.id_fisioterapeuta);
        setNomeFisioterapeuta(nomeFisio || 'Fisioterapeuta não encontrado');

        setAgendamento(agendamentoData);
      } else {
        setAgendamento(null);
      }
    } catch (error) {
      console.error('Erro ao buscar próximo agendamento:', error);
      setAgendamento(null);
    }
  }
};

useEffect(() => {
  fetchProximoAgendamento();
}, [userId]);

function deletarAgendamento() {
  deleteAgendamento(agendamento.id || 0);
  fetchProximoAgendamento();
  Alert.alert('Agendamento cancelado com sucesso!'); 
}


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
                      <Text style={styles.text}>Fisioterapeuta: {nomeFisioterapeuta}</Text>
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

          <TouchableOpacity style={styles.cancelButton} onPress={deletarAgendamento}>
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
