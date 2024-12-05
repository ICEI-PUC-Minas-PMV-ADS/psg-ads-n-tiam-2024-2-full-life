import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export function ButtonBlock({ title, onPress }: { title: string; onPress: () => void }) {
    return (
      <TouchableOpacity style={styles.buttonBlock} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonBlock: {
      width: 150,
      height: 250,
      backgroundColor: '#4CAF50',
      marginRight: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
  });
  