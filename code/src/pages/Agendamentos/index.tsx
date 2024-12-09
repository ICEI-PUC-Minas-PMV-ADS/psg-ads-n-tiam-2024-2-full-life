import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { Calendario } from '../../components/Calendario';
import { Botao } from '../../components/Botao';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { getEspecialidades } from '../../services/especialidadeService';
import { fetchAgendamentos } from '../../services/fisioterapeutaService';
import { agendarHorario } from '../../services/agendamentoService';
import { getId } from '../../services/pacienteService';

export default function Agendamento() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [especialidade, setEspecialidade] = useState('');
  const [horario, setHorario] = useState<string>('');
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [agendamentos, setAgendamentos] = useState<{ [key: string]: string[] }>({});
  const [id, setId] = useState<Number>();

  const fetchData = async () => {
    try {
      const agendamentosDoBanco = await fetchAgendamentos();
      if (agendamentosDoBanco) {
        setAgendamentos(agendamentosDoBanco);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const especialidadesDoBanco = await getEspecialidades();
        setEspecialidades(especialidadesDoBanco);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
      }
    };

    const fetchId = async () => {
      try {
        const idPaciente = await getId();
        if (idPaciente) {
          setId(idPaciente);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchEspecialidades();
    fetchData();
    fetchId();
  }, []);

  const alterarDataHora = (data: Date, hora: string) => {
    const [horas, minutos] = hora.split(':').map(Number);
    const dataComHora = new Date(data);
    dataComHora.setHours(horas, minutos, 0, 0);
    setDataSelecionada(dataComHora);
  };

  const confirmarAgendamento = async () => {
    if (dataSelecionada && horario && especialidade) {
      const agendamento = {
        id_paciente: id as number,
        id_fisioterapeuta: 2,
        especialidade: especialidade,
        data_hora: dataSelecionada,
        status: 'agendado'
      };
      try {
        const resultado = await agendarHorario(agendamento);
        if (resultado.success) {
          Alert.alert(
            "Agendamento Confirmado",
            "Seu agendamento foi realizado com sucesso!",
            [{ text: "OK" }]
          );

          await fetchData();
          cancelarAgendamento();
        } else {
          throw new Error(resultado.error as string);
        }
      } catch (error) {
        Alert.alert(
          "Erro",
          "Não foi possível realizar o agendamento. Por favor, tente novamente.",
          [{ text: "OK" }]
        );
        console.error('Erro ao agendar horário:', error);
      }
    } else {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos antes de confirmar o agendamento.",
        [{ text: "OK" }]
      );
    }
  };

  const cancelarAgendamento = () => {
    setDataSelecionada(null);
    setEspecialidade('');
    setHorario('');
  };

  function selecionarData(data: Date | null): string[] {
    if (!data) return [];
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return agendamentos[dataFormatada] || [];
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarraSuperior titulo="FullLife"/>
      <View style={styles.conteudo}>
        <Text style={styles.textoCabecalho}>Realizar agendamento:</Text>
        <View style={styles.secaoCalendario}>
          <Calendario
            agendamentos={agendamentos}
            aoAlterarDataHora={alterarDataHora}
            dataSelecionada={dataSelecionada}
          />
        </View>
        <Text style={styles.textoCabecalho}>Selecionar Hora:</Text>
        <CampoDeEntrada
          placeholder="Horários"
          value={horario}
          onChangeText={(atualizarHorario) => {
            setHorario(atualizarHorario);
            if (dataSelecionada) {
              alterarDataHora(dataSelecionada, atualizarHorario);
            }
          }}
          options={selecionarData(dataSelecionada)}
        />
        <Text style={styles.textoCabecalho}>Especialidade:</Text>
        <CampoDeEntrada
          placeholder="Especialidade"
          value={especialidade}
          onChangeText={setEspecialidade}
          options={especialidades}
        />
        <View style={styles.containerBotoes}>
          <Botao
            style={styles.botaoCancelar}
            titulo="Cancelar"
            onPress={cancelarAgendamento}
            textStyle={styles.textoBotaoCancelar}
          />
          <Botao
            style={styles.botaoConfirmar}
            titulo="Confirmar"
            onPress={confirmarAgendamento}
            textStyle={styles.textoBotaoConfirmar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  textoCabecalho: {
    fontSize: 17,
    color: '#333',
    marginBottom: 10,
  },
  secaoCalendario: {
    marginBottom: 20,
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    height: 70,
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    height: 70,
  },
  textoBotaoCancelar: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotaoConfirmar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});