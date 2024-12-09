import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarraSuperior } from "../../components/BarraSuperior";
import { getAllPacientes } from "../../services/pacienteService";

interface Paciente {
  id: number;
  nome: string;
}

export default function ListarPacientes() {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const pacientesData = await getAllPacientes();
        setPacientes(pacientesData);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <BarraSuperior titulo="FullLife" />
      <View style={styles.conteudo}>
        <Text style={styles.textoCabecalho}>Pacientes</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#9E9E9E" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do paciente"
            placeholderTextColor="#9E9E9E"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.pacienteContainer}>
              <Text style={styles.pacienteTexto}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  conteudo: { flex: 1, padding: 16 },
  textoCabecalho: { fontSize: 17, color: "#333", marginBottom: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9E9E9E",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    height: 40,
    marginBottom: 20,
  },
  input: { flex: 1, color: "#000", marginLeft: 8 },
  icon: { marginRight: 5 },
  pacienteContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  pacienteTexto: { fontSize: 16, color: "#333" },
});
