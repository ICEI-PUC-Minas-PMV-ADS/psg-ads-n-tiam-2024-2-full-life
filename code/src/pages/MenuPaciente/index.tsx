import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarraSuperior }  from '../../components/BarraSuperior';
import { ButtonBlock } from '../../components/BotaoNavigation';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    MenuPaciente: undefined;
    Agendamentos: undefined;
    AcompanharConsultas: undefined;
    HistoricoConsultas: undefined;
  };
  
  type MenuPacienteNavigationProps = NativeStackNavigationProp<RootStackParamList, "MenuPaciente">;

export default function MenuPaciente() {
    const navigation = useNavigation<MenuPacienteNavigationProps>();

  return (
    <View style={styles.container}>
      <BarraSuperior titulo='FullLife' />

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Olá, Paciente</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <ButtonBlock
          title="Realizar Agendamento"
          onPress={() => navigation.navigate("Agendamentos")}
        />
        <ButtonBlock
          title="Exercícios recomendados"
          onPress={() => navigation.navigate("AcompanharConsultas")}
        />
        <ButtonBlock
          title="Anamnese"
          onPress={() => navigation.navigate('HistoricoConsultas')}
        />
      </ScrollView>

      <View style={styles.additionalContent}>
        <Text>Additional Content Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  greetingContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 18,
    marginBottom: 8,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: {
    fontSize: 18,
    color: '#888888',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 16,
  },
  buttonBlock: {
    width: 150,
    height: 100,
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
  additionalContent: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
