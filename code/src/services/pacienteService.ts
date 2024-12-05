import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export async function savePaciente(data: any) {
  try {
    const pacienteRef = doc(collection(db, "Pacientes"), data.id);
    await setDoc(pacienteRef, data);
    console.log("Paciente cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar paciente:", error);
    throw error;
  }
}

export async function getNomePaciente(): Promise<string | null> {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn("Usuário não está logado.");
      return null;
    }

    const pacienteRef = doc(db, "Pacientes", user.uid);
    const pacienteDoc = await getDoc(pacienteRef);

    if (pacienteDoc.exists()) {
      const pacienteData = pacienteDoc.data();
      return pacienteData?.nome || null; 
    } else {
      console.warn("Documento do paciente não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar nome do paciente:", error);
    throw error;
  }
}
