import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CalendarioProps {
  agendamentos: { [data: string]: string[] };
  aoAlterarDataHora: (data: Date, hora: string) => void;
  dataSelecionada: Date | null;
}

export function Calendario({ agendamentos, aoAlterarDataHora, dataSelecionada }: CalendarioProps) {
  const [dataInternaSelecionada, setDataInternaSelecionada] = useState<Date | null>(dataSelecionada);
  const [mesAtual, setMesAtual] = useState(new Date());

  useEffect(() => {
    setDataInternaSelecionada(dataSelecionada);
  }, [dataSelecionada]);

  const obterDiasDoMes = (data: Date) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    return new Date(ano, mes + 1, 0).getDate();
  };

  const obterPrimeiroDiaDoMes = (data: Date) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    return new Date(ano, mes, 1).getDay();
  };

  const handleMesAnterior = () => {
    setMesAtual((mesAnterior) => {
      const ano = mesAnterior.getFullYear();
      const mes = mesAnterior.getMonth();
      return new Date(ano, mes - 1, 1);
    });
  };

  const handleProximoMes = () => {
    setMesAtual((mesAnterior) => {
      const ano = mesAnterior.getFullYear();
      const mes = mesAnterior.getMonth();
      return new Date(ano, mes + 1, 1);
    });
  };

  const renderizarCabecalhoCalendario = () => {
    const nomeMes = mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return (
      <View style={styles.cabecalhoCalendario}>
        <View style={styles.linhaCabecalho}>
          <TouchableOpacity onPress={handleMesAnterior} style={styles.botaoNavegacao}>
            <Text style={styles.textoBotaoNavegacao}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.tituloMes}>{nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)}</Text>
          <TouchableOpacity onPress={handleProximoMes} style={styles.botaoNavegacao}>
            <Text style={styles.textoBotaoNavegacao}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linhaDiasSemana}>
          <Text style={styles.diaSemana}>S</Text>
          <Text style={styles.diaSemana}>T</Text>
          <Text style={styles.diaSemana}>Q</Text>
          <Text style={styles.diaSemana}>Q</Text>
          <Text style={styles.diaSemana}>S</Text>
          <Text style={styles.diaSemana}>S</Text>
          <Text style={styles.diaSemana}>D</Text>
        </View>
      </View>
    );
  };

  const renderizarDiasCalendario = () => {
    const diasDoMes = obterDiasDoMes(mesAtual);
    const primeiroDiaDoMes = obterPrimeiroDiaDoMes(mesAtual);
    const dias = [];

    for (let i = 0; i < primeiroDiaDoMes; i++) {
      dias.push(<View key={`vazio-${i}`} style={styles.celulaDia} />);
    }

    for (let i = 1; i <= diasDoMes; i++) {
      const data = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), i);
      const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const temAgendamentos = agendamentos[dataFormatada]?.length > 0;

      dias.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.celulaDia,
            temAgendamentos && styles.diaDisponivel,
            dataInternaSelecionada?.getDate() === i &&
              dataInternaSelecionada?.getMonth() === mesAtual.getMonth() &&
              dataInternaSelecionada?.getFullYear() === mesAtual.getFullYear() &&
              styles.diaSelecionado,
          ]}
          onPress={() => {
            if (temAgendamentos) {
              setDataInternaSelecionada(data);
              const horariosDisponiveis = agendamentos[dataFormatada];
              if (horariosDisponiveis && horariosDisponiveis.length > 0) {
                aoAlterarDataHora(data, horariosDisponiveis[0]);
              }
            }
          }}
        >
          <Text
            style={[
              styles.textoDia,
              temAgendamentos && styles.textoDiaDisponivel,
              dataInternaSelecionada?.getDate() === i &&
                dataInternaSelecionada?.getMonth() === mesAtual.getMonth() &&
                dataInternaSelecionada?.getFullYear() === mesAtual.getFullYear() &&
                styles.textoDiaSelecionado,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return <View style={styles.gradeCalendario}>{dias}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCalendario}>
        {renderizarCabecalhoCalendario()}
        {renderizarDiasCalendario()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerCalendario: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  cabecalhoCalendario: {
    marginBottom: 10,
  },
  linhaCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloMes: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  botaoNavegacao: {
    paddingHorizontal: 10,
  },
  textoBotaoNavegacao: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  linhaDiasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  diaSemana: {
    width: 30,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  gradeCalendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  celulaDia: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoDia: {
    fontSize: 14,
    color: '#333',
  },
  diaDisponivel: {
    backgroundColor: '#e8f5e9',
  },
  textoDiaDisponivel: {
    color: '#4CAF50',
    fontWeight: '500',
    paddingBottom: 12,
  },
  diaSelecionado: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  textoDiaSelecionado: {
    color: 'white',
    fontWeight: 'bold',
  },
});
