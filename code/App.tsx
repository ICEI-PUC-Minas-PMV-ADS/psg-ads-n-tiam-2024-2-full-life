import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/Login";
import CadastroScreen from "./src/pages/Cadastro";
import MenuPaciente from "./src/pages/MenuPaciente"; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="MenuPaciente" component={MenuPaciente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
