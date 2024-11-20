import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/exemploFirebase';
import Agendamento  from './src/pages/Agendamentos';
import Agendamento_marcados  from './src/pages/Agendamentos_marcados';

export default function App() {
  return (
    <Agendamento_marcados />
  );
}
