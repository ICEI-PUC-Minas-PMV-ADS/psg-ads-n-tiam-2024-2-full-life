import { db } from "./firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

interface EspecialidadesData {
  Especialidades: string[];
}

export async function getEspecialidades(): Promise<string[]> {
  try {
    const especialidadesDocRef = doc(db, "Especialidades", "xd4d2a1p4NiZ37mCSajl");

    const especialidadesDocSnap = await getDoc(especialidadesDocRef);

    if (especialidadesDocSnap.exists()) {
      const data = especialidadesDocSnap.data() as EspecialidadesData;
      return data?.Especialidades || [];
    } else {
      console.warn("Documento de especialidades não encontrado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar especialidades: ", error);
    return [];
  }
}

// const agendamentos: { [key: string]: string[] } = {
  //   '09/09/2024': ['09:00', '10:00', '14:00'],
  //   '15/09/2024': ['09:00', '10:00', '14:00', '15:00'],
  //   '16/09/2024': ['08:00', '11:00', '13:00', '16:00'],
  //   '17/09/2024': ['09:30', '10:30', '14:30', '15:30'],
  // };