import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { Calendario } from '../../components/Calendario';
import { Botao } from '../../components/Botao';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { getEspecialidades } from '../../services/especialidadeService';
import fetchAgendamentos from '../../services/fisioterapeutaService';
import { agendarHorario } from '../../services/agendamentoService';


export default function Agendamento() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [especialidade, setEspecialidade] = useState('');
  const [horario, setHorario] = useState<string>('');
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [agendamentos, setAgendamentos] = useState<{ [key: string]: string[] }>({});


  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const especialidadesDoBanco = await getEspecialidades();
        setEspecialidades(especialidadesDoBanco);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
      }
    };

    // Busca os agendamentos
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

    fetchEspecialidades();
    fetchData();
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
        id_paciente: 1,
        id_fisioterapeuta: 1,
        especialidade: especialidade,
        data_hora: dataSelecionada,
        status: 'agendado'
      };
      try {
        const resultado = await agendarHorario(agendamento);
      } catch (error) {
        console.error('Erro ao agendar horário:', error);
      }
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
      <BarraSuperior titulo="FullLife" aoPressionarVoltar={() => {}} />
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
    height: 70
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    height: 70
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
