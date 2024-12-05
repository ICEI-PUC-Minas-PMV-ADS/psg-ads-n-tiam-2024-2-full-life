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
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BarraSuperior } from "../../components/BarraSuperior";

type RootStackParamList = {
  LoginScreen: undefined;
  CadastroScreen: undefined;
  MenuPaciente: undefined;
  MenuFisioterapeuta: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "LoginScreen">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  async function login() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const fisioterapeutaRef = collection(db, "Fisioterapeutas");
      const fisioterapeutaQuery = query(fisioterapeutaRef, where("email", "==", email));
      const fisioterapeutaSnapshot = await getDocs(fisioterapeutaQuery);

      if (!fisioterapeutaSnapshot.empty) {
        navigation.navigate("MenuFisioterapeuta");
        return;
      }

      const pacienteRef = collection(db, "Pacientes");
      const pacienteQuery = query(pacienteRef, where("email", "==", email));
      const pacienteSnapshot = await getDocs(pacienteQuery);

      if (!pacienteSnapshot.empty) {
        navigation.navigate("MenuPaciente");
        return;
      }

      Alert.alert("Erro", "Usuário não encontrado no banco de dados.");
    } catch (error) {
      Alert.alert("Erro", "Usuário ou senha inválidos.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BarraSuperior titulo="FullLife" />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("CadastroScreen")}>
          <Text style={styles.registerContainer}>
            <Text style={styles.registerPrompt}>Não tem uma conta? </Text>
            <Text style={styles.registerLink}>Cadastre aqui</Text>
          </Text>
        </TouchableOpacity>
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
  registerContainer: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  registerPrompt: {
    color: "white",
    textDecorationLine: "none",
  },
  registerLink: {
    color: "black",
    textDecorationLine: "none",
    fontWeight: "bold",
  },
});
