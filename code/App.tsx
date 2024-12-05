import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/Login";
import CadastroScreen from "./src/pages/Cadastro";
import MenuPaciente from "./src/pages/MenuPaciente"; 
import AcompanharConsultas from "./src/pages/Acompanhar_consultas";
import Agendamento from "./src/pages/Agendamentos";
import HistoricoConsultas from "./src/pages/Historico_consultas";

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
        <Stack.Screen name="AcompanharConsultas" component={AcompanharConsultas} />
        <Stack.Screen name="Agendamentos" component={Agendamento} />
        <Stack.Screen name="HistoricoConsultas" component={HistoricoConsultas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
