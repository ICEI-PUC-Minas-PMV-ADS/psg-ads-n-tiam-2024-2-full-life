import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CampoDeEntradaProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  options?: string[];
}

export function CampoDeEntrada({ placeholder, value, onChangeText, options }: CampoDeEntradaProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectOption = (option: string) => {
    onChangeText(option);
    setModalVisible(false);
  };

  const handleClearSelection = () => {
    onChangeText('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          editable={false}
          placeholderTextColor="#9E9E9E"
        />
        <Ionicons name="chevron-down" size={20} color="#9E9E9E" style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={['Limpar seleção', ...options]} // Adiciona a opção de limpar seleção
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => item === 'Limpar seleção' ? handleClearSelection() : handleSelectOption(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9E9E9E',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 40,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
  },
  optionText: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
});
