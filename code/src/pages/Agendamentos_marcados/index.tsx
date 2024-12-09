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
import { getConsultasFromConsultasCollection } from "../../services/consultasService";
import { getNomePaciente } from "../../services/pacienteService";

interface Consulta {
  data_hora: string;
  id_fisioterapeuta: string;
  id_paciente: number;
  observacoes: string;
  nome_paciente?: string;
}

export default function AgendamentosMarcados() {
  const [search, setSearch] = useState("");
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    const fetchConsultasFromConsultas = async () => {
      try {
        const consultasData = await getConsultasFromConsultasCollection();

        const consultasComNome = await Promise.all(
          consultasData.map(async (consulta: Consulta) => {
            try {
              const nomePaciente = await getNomePaciente(consulta.id_paciente);
              return { ...consulta, nome_paciente: nomePaciente };
            } catch {
              return { ...consulta, nome_paciente: "Nome não encontrado" };
            }
          })
        );

        setConsultas(consultasComNome);
      } catch (error) {
        console.error("Erro ao carregar consultas da coleção Consultas:", error);
      }
    };

    fetchConsultasFromConsultas();
  }, []);

  const formatarData = (dataISO: string): string => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const consultasFiltradas = consultas.filter(
    (consulta) =>
      consulta.nome_paciente?.toLowerCase().includes(search.toLowerCase()) ||
      consulta.observacoes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <BarraSuperior titulo="FullLife" />
      <View style={styles.conteudo}>
        <Text style={styles.textoCabecalho}>Consultas</Text>
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
          data={consultasFiltradas}
          keyExtractor={(item, index) => `${item.id_paciente}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.consultaContainer}>
              <Text style={styles.consultaTexto}>
                Data consulta: {formatarData(item.data_hora)}
              </Text>
              <Text style={styles.consultaTexto}>Paciente: {item.nome_paciente}</Text>
              <Text style={styles.consultaTexto}>Observações: {item.observacoes}</Text>
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
  consultaContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  consultaTexto: { fontSize: 14, color: "#333" },
});
