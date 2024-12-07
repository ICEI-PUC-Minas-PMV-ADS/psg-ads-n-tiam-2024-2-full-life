import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, SafeAreaView } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { BarraSuperior } from '../../components/BarraSuperior'; 
import { getId } from '../../services/pacienteService';
import { getConsultasByPatientId } from '../../services/consultasService';
import { getNomeFisioterapeuta } from '../../services/fisioterapeutaService';

export default function HistoricoConsultas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [consultas, setConsultas] = useState<Array<{ id: string; texto: string }>>([]);

  const filteredConsultas = consultas.filter((consulta) =>
    consulta.texto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idPaciente = await getId();
  
        if (idPaciente) {
          const consultasDoBanco = await getConsultasByPatientId(idPaciente);

          const consultasFormatadas = await Promise.all(
            consultasDoBanco.map(async (consulta) => {
              const nomeFisioterapeuta = await getNomeFisioterapeuta(consulta.id_fisioterapeuta);
  
              return {
                id: String(consulta.id),
                texto: `Consulta ${new Date(consulta.data_hora).toLocaleDateString()} às ${new Date(consulta.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n` +
                       `Fisioterapeuta: ${nomeFisioterapeuta}\n` +
                       `Observações: ${consulta.observacoes}`,
              };
            })
          );
  
          setConsultas(consultasFormatadas || []);
        }
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const renderConsulta = ({ item }: { item: { id: string; texto: string } }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text>{item.texto}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
            data={filteredConsultas} 
            renderItem={renderConsulta}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffff",
  },
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
