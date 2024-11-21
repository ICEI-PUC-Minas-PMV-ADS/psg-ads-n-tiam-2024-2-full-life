import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BotaoProps {
  titulo: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Botao({ titulo, onPress, style, textStyle: textSttyle }: BotaoProps) {
  return (
    <TouchableOpacity style={[styles.botao, style]} onPress={onPress}>
      <Text style={[styles.textoBotao, textSttyle]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
