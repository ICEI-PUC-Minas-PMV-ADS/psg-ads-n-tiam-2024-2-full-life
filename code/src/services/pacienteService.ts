import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

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
