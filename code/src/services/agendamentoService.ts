import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";

type Agendamento = {
  id?: string;
  id_paciente: string;
  id_fisioterapeuta: string;
  especialidade: string;
  data_hora: Date;
  status: string;
};

export const agendarHorario = async (agendamento: Agendamento) => {
  try {
    const agendamentosRef = collection(db, "Agendamentos");

    const querySnapshot = await getDocs(agendamentosRef);
    let maiorId = 0;
    
    querySnapshot.forEach((doc) => {
      const agendamentoData = doc.data();
      const id = parseInt(agendamentoData.id);
      if (id > maiorId) {
        maiorId = id;
      }
    });

    const novoId = maiorId + 1;

    await addDoc(agendamentosRef, {
      id: novoId,
      id_paciente: agendamento.id_paciente,
      id_fisioterapeuta: agendamento.id_fisioterapeuta,
      especialidade: agendamento.especialidade,
      data_hora: agendamento.data_hora,
      status: "agendado"
    });

    return { success: true, id: novoId };
  } catch (error) {
    console.error("Erro ao agendar horário:", error);
    return { success: false, error: error };
  }
};
