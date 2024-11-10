import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type BarraSuperiorProps = {
  titulo: string;
  aoPressionarVoltar: () => void;
};

export function BarraSuperior({ titulo, aoPressionarVoltar }: BarraSuperiorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={aoPressionarVoltar} style={styles.botaoVoltar}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#4CAF50', 
  },
  botaoVoltar: {
    marginRight: 10,
  },
  titulo: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginRight: 40,
  },
  saudacaoUsuario: {
    fontSize: 16,
    color: 'white',
  },
});
