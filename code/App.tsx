import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/Login";
import CadastroScreen from "./src/pages/Cadastro";
import MenuPaciente from "./src/pages/MenuPaciente"; 
import MenuFisioterapeuta from "./src/pages/MenuFisioterapeuta"; 
import AcompanharConsultas from "./src/pages/Acompanhar_consultas";
import Agendamento from "./src/pages/Agendamentos";
import HistoricoConsultas from "./src/pages/Historico_consultas";
import ExerciciosPaciente from "./src/pages/Exercicios_paciente";
import CadastroExercicios from "./src/pages/Cadastro_exercicios";
import AdicionarTratamentos from "./src/pages/Adicionar_exercicios";
import AnamnesePaciente from "./src/pages/AnamnesePaciente";
import AnamneseFisioterapeuta from "./src/pages/AnamneseFisioterapeuta";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="MenuPaciente" component={MenuPaciente} />
        <Stack.Screen name="MenuFisioterapeuta" component={MenuFisioterapeuta} />
        <Stack.Screen name="AcompanharConsultas" component={AcompanharConsultas} />
        <Stack.Screen name="Agendamentos" component={Agendamento} />
        <Stack.Screen name="HistoricoConsultas" component={HistoricoConsultas} />
        <Stack.Screen name="ExerciciosPaciente" component={ExerciciosPaciente} />
        <Stack.Screen name="CadastroExercicios" component={CadastroExercicios} />
        <Stack.Screen name="AdicionarTratamentos" component={AdicionarTratamentos} />
        <Stack.Screen name="AnamnesePaciente" component={AnamnesePaciente} />
        <Stack.Screen name="AnamneseFisioterapeuta" component={AnamneseFisioterapeuta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
