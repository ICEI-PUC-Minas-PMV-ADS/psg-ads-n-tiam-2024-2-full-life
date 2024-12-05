import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior'; 

export default function HistoricoConsultas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [consultas, setConsultas] = useState([
    { id: '1', texto: 'Consulta 04/10/2024 às 10:40\nFisioterapeuta: Marcelo Dias' },
    { id: '2', texto: 'Consulta 2' },
    { id: '3', texto: 'Consulta 3' },
    { id: '4', texto: 'Consulta 4' },
    { id: '5', texto: 'Consulta 5' },
  ]);

  const renderConsulta = ({ item }: { item: { id: string; texto: string } }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text>{item.texto}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <BarraSuperior titulo='FullLife'/>
      
      <View style={styles.content}>
        <Text style={styles.title}>Histórico de consultas</Text>
        
        <View style={styles.searchContainer}>
          <IconButton icon="magnify" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do fisioterapeuta"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <FlatList
          data={consultas}
          renderItem={renderConsulta}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
