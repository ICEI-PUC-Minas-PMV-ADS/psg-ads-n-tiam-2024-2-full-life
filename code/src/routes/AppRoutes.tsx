import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../pages/Login";
import CadastroScreen from "../pages/Cadastro";
import Agendamento from "../pages/Agendamentos";
import AgendamentosMarcados from "../pages/Agendamentos_marcados";
import MenuPaciente from "../pages/MenuPaciente";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  MenuPaciente: undefined;
  Agendamentos: undefined;
  AgendamentosMarcados: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Definindo as rotas */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="MenuPaciente" component={MenuPaciente} />
        <Stack.Screen name="Agendamentos" component={Agendamento} />
        <Stack.Screen name="AgendamentosMarcados" component={AgendamentosMarcados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
