import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";

type Agendamento = {
  id?: string;
  id_paciente: number;
  id_fisioterapeuta: number;
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

    const pacientesRef = collection(db, "Pacientes");
    const pacienteQuery = query(pacientesRef, where("id", "==", Number(agendamento.id_paciente)));
    const pacienteSnapshot = await getDocs(pacienteQuery);

    if (pacienteSnapshot.empty) {
      throw new Error("Paciente não encontrado");
    }

    const pacienteData = pacienteSnapshot.docs[0].data();

    const fisioterapeutasRef = collection(db, "Fisioterapeutas");
    const fisioterapeutaQuery = query(fisioterapeutasRef, where("id", "==", Number(agendamento.id_fisioterapeuta)));
    const fisioterapeutaSnapshot = await getDocs(fisioterapeutaQuery);

    if (fisioterapeutaSnapshot.empty) {
      throw new Error("Fisioterapeuta não encontrado");
    }

    const fisioterapeutaData = fisioterapeutaSnapshot.docs[0].data();

    await addDoc(agendamentosRef, {
      id: novoId,
      paciente: pacienteData,
      fisioterapeuta: fisioterapeutaData,
      especialidade: agendamento.especialidade,
      data_hora: agendamento.data_hora,
      status: "agendado",
    });

    return { success: true, id: novoId };
  } catch (error) {
    console.error("Erro ao agendar horário:", error);
    return { success: false, error: error };
  }
};
