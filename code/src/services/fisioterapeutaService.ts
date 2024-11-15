// src/services/fisioterapeutasService.ts
import { db } from "./firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

interface Fisioterapeuta {
  id: string;
  nome: string;
  email: string;
  senha: string;
  numero_crefito: string;
  especialidades: string[];
  telefone: string;
  endereco: string;
  agenda: {
    data: string[];
  };
}

export async function getAllEspecialidades(): Promise<string[]> {
  try {
    const fisioterapeutasCollection = collection(db, "Fisioterapeutas");
    const snapshot = await getDocs(fisioterapeutasCollection);

    const especialidades: string[] = [];
    snapshot.forEach((doc) => {
      const fisioterapeuta = doc.data() as Fisioterapeuta;
      fisioterapeuta.especialidades.forEach((especialidade) => {
        if (!especialidades.includes(especialidade)) {
          especialidades.push(especialidade);
        }
      });
    });

    return especialidades;
  } catch (error) {
    console.error("Erro ao buscar especialidades: ", error);
    return [];
  }
}
