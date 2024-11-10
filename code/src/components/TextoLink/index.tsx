import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TextoLinkProps {
  texto: string;
  aoPressionar: () => void;
}

export function TextoLink({ texto, aoPressionar }: TextoLinkProps) {
  return (
    <TouchableOpacity onPress={aoPressionar}>
      <Text style={styles.textoLink}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textoLink: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});
