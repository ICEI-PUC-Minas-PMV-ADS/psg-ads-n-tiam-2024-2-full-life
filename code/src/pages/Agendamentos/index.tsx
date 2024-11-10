import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { Calendario } from '../../components/Calendario';
import { Botao } from '../../components/Botao';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';

export default function Agendamento() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [especialidade, setEspecialidade] = useState('');
  const [horario, setHorario] = useState<string>('');

  const especialidades = ['Coluna', 'Quiropraxia', 'Ortopedia', 'Pediatria'];

  const agendamentos: { [key: string]: string[] } = {
    '09/09/2024': ['09:00', '10:00', '14:00'],
    '15/09/2024': ['09:00', '10:00', '14:00', '15:00'],
    '16/09/2024': ['08:00', '11:00', '13:00', '16:00'],
    '17/09/2024': ['09:30', '10:30', '14:30', '15:30'],
  };

  const alterarDataHora = (data: Date, hora: string) => {
    setDataSelecionada(data);
    setHorario('');
  };

  const confirmarAgendamento = () => {
    console.log('Agendamento confirmado:', {
      data: dataSelecionada,
      horario,
      especialidade,
    });
  };

  const cancelarAgendamento = () => {
    setDataSelecionada(null); 
    setEspecialidade('');
    setHorario('');
  };

  function selecionarData(data: Date | null): any {
    if (!data) {
      return []; 
    }

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
        <View style={styles.cabecalho}>
          <Text style={styles.textoCabecalho}>Realizar agendamento:</Text>
        </View>

        <View style={styles.secaoCalendario}>
          <Calendario agendamentos={agendamentos} aoAlterarDataHora={alterarDataHora} dataSelecionada={dataSelecionada} />
        </View>

        <Text style={styles.textoCabecalho}>Selecionar Hora:</Text>
        <View style={styles.secaoHora}>
          <CampoDeEntrada
            placeholder="Horários"
            value={horario}
            onChangeText={setHorario}
            options={selecionarData(dataSelecionada)}
          />
        </View>

        <Text style={styles.textoCabecalho}>Especialidade:</Text>
        <View style={styles.secaoEspecialidade}>
          <CampoDeEntrada
            placeholder="Especialidade"
            value={especialidade}
            onChangeText={setEspecialidade}
            options={especialidades}
          />
        </View>

        <View style={styles.containerBotoes}>
          <Botao style={styles.botaoCancelar} titulo="Cancelar" onPress={cancelarAgendamento} textStyle={styles.textoBotaoCancelar} />
          <Botao style={styles.botaoConfirmar} titulo="Confirmar" onPress={confirmarAgendamento} textStyle={styles.textoBotaoConfirmar} />
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
  cabecalho: {
    marginBottom: 20,
  },
  textoCabecalho: {
    fontSize: 17,
    color: '#333',
  },
  secaoCalendario: {
    marginBottom: 10,
  },
  secaoHora: {},
  secaoEspecialidade: {
    marginBottom: 20,
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
    gap: 20,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
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
