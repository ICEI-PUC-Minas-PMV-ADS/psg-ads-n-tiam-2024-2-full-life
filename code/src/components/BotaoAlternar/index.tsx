import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BotaoAlternarProps {
  opcoes: string[];
  aoSelecionar: (selecionado: string) => void;
}

export function BotaoAlternar({ opcoes, aoSelecionar }: BotaoAlternarProps) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(opcoes[0]);

  const tratarPressao = (opcao: string) => {
    setOpcaoSelecionada(opcao);
    aoSelecionar(opcao);
  };

  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={[
            styles.botao,
            opcaoSelecionada === opcao && styles.botaoSelecionado,
          ]}
          onPress={() => tratarPressao(opcao)}
        >
          <Text style={styles.textoBotao}>{opcao}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botao: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  botaoSelecionado: {
    backgroundColor: '#4CAF50',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});

