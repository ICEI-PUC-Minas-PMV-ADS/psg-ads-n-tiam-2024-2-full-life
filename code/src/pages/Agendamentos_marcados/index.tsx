import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarraSuperior } from "../../components/BarraSuperior";
import { getConsultas } from "../../services/consultasService";

interface Consulta {
  data_hora: string;
  id_fisioterapeuta: string;
  id_paciente: string;
  observacoes: string;
}

export default function AgendamentosMarcados() {
  const [search, setSearch] = useState("");
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const consultasData = await getConsultas();
        setConsultas(consultasData);
      } catch (error) {
        console.error("Erro ao carregar consultas:", error);
      }
    };

    fetchConsultas();
  }, []);

  const consultasFiltradas = consultas.filter((consulta) =>
    String(consulta.observacoes).toLowerCase().includes(search.toLowerCase()) ||
    String(consulta.id_paciente).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <BarraSuperior titulo="FullLife" aoPressionarVoltar={() => {}} />
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
              <Text style={styles.consultaTexto}>Data consulta: {item.data_hora}</Text>
              <Text style={styles.consultaTexto}>Id do paciente: {item.id_paciente}</Text>
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
