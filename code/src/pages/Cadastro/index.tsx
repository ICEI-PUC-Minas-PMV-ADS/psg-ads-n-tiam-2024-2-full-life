import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { auth } from "../../services/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { savePaciente } from "../../services/pacienteService";
import { saveFisioterapeuta } from "../../services/fisioterapeutaService";

export default function CadastroScreen() {
  const [tipoCadastro, setTipoCadastro] = useState<"Paciente" | "Fisioterapeuta">("Paciente");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [crefito, setCrefito] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const handleConfirmar = async () => {
    if (!nome || !cpf || !email || !dataNascimento || !senha || (tipoCadastro === "Fisioterapeuta" && !crefito)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const userId = userCredential.user.uid;

      if (tipoCadastro === "Paciente") {
        await savePaciente({
          id: userId,
          nome,
          email,
          senha,
          data_nascimento: dataNascimento,
          telefone: "",
          endereco: "",
          historico_medico: "",
        });
      } else {
        await saveFisioterapeuta({
          id: userId,
          nome,
          email,
          senha,
          numero_crefito: crefito,
          especialidades: [],
          telefone: "",
          endereco: "",
          agenda: {},
        });
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("LoginScreen" as never);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              tipoCadastro === "Paciente" && styles.activeSwitch,
            ]}
            onPress={() => setTipoCadastro("Paciente")}
          >
            <Text style={styles.switchText}>Paciente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              tipoCadastro === "Fisioterapeuta" && styles.activeSwitch,
            ]}
            onPress={() => setTipoCadastro("Fisioterapeuta")}
          >
            <Text style={styles.switchText}>Fisioterapeuta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>CPF:</Text>
          <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />

          {tipoCadastro === "Fisioterapeuta" && (
            <>
              <Text style={styles.label}>CREFITO:</Text>
              <TextInput
                style={styles.input}
                value={crefito}
                onChangeText={setCrefito}
              />
            </>
          )}

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Data de nascimento:</Text>
          <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#68b089", 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  switchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#74c2a8",
  },
  activeSwitch: {
    backgroundColor: "#3b8b64",
  },
  switchText: {
    color: "white",
    fontWeight: "bold",
  },
  form: {
    width: "80%",
    backgroundColor: "#74c2a8",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3b8b64",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
