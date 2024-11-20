import { db } from "./firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

interface Consulta {
  data_hora: string;
  id_fisioterapeuta: string;
  id_paciente: string;
  observacoes: string;
}

export async function getConsultas(): Promise<Consulta[]> {
  try {
    const agendamentosRef = collection(db, "Agendamentos");

    const consultasData: Consulta[] = [];
    const agendamentosSnapshot = await getDocs(agendamentosRef);

    agendamentosSnapshot.forEach((doc) => {
      const data = doc.data();
      consultasData.push({
        data_hora: data.data_hora
          ? typeof data.data_hora.toDate === "function"
            ? data.data_hora.toDate().toISOString() 
            : new Date(data.data_hora).toISOString() 
          : "",
        id_fisioterapeuta: data.id_fisioterapeuta || "",
        id_paciente: data.id_paciente || "",
        observacoes: data.observacoes || "",
      });
    });

    return consultasData;
  } catch (error) {
    console.error("Erro ao buscar consultas: ", error);
    return [];
  }
}
