import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LinkTextProps {
  text: string;
  onPress: () => void;
}

function LinkText({ text, onPress }: LinkTextProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LinkText;
