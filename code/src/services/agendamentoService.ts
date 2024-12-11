import { collection, query, where, getDocs, addDoc, orderBy, limit, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";

type Agendamento = {
  id?: string;
  id_paciente: number;
  id_fisioterapeuta: number;
  especialidade: string;
  data_hora: Date;
  status: string;
};

export async function getProximoAgendamentoFisioterapeuta() {
  try {
    const fisioterapeutaId = 2;
    const appointmentsRef = collection(db, 'Agendamentos');
    const appointmentQuery = query(
      appointmentsRef,
      orderBy('data_hora', 'asc'),
      where('id_fisioterapeuta', '==', fisioterapeutaId),
      where('data_hora', '>=', new Date()),
      limit(1)
    );
    const querySnapshot = await getDocs(appointmentQuery);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data();
  } catch (error) {
    console.error('Erro ao buscar próximo agendamento:', error);
    throw error;
  }
}

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

    const fisioterapeutasRef = collection(db, "Fisioterapeutas");
    console.log(agendamento.id_fisioterapeuta)
    const fisioterapeutaQuery = query(fisioterapeutasRef, where("id", "==", Number(agendamento.id_fisioterapeuta)));
    const fisioterapeutaSnapshot = await getDocs(fisioterapeutaQuery);

    if (fisioterapeutaSnapshot.empty) {
      throw new Error("Fisioterapeuta não encontrado");
    }

    const fisioterapeutaDoc = fisioterapeutaSnapshot.docs[0];
    const fisioterapeutaData = fisioterapeutaDoc.data();

    await addDoc(agendamentosRef, {
      id: novoId,
      id_paciente: agendamento.id_paciente,
      id_fisioterapeuta: agendamento.id_fisioterapeuta,
      especialidade: agendamento.especialidade,
      data_hora: agendamento.data_hora,
      status: "Agendado",
    });

    const diaAgendamento = new Date(agendamento.data_hora).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const horarioAgendamento = new Date(agendamento.data_hora).toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }); 

    if (fisioterapeutaData.agenda && fisioterapeutaData.agenda[diaAgendamento]) {
      const horariosDisponiveis = fisioterapeutaData.agenda[diaAgendamento].filter((horario: string) => horario !== horarioAgendamento);

      if (horariosDisponiveis.length > 0) {
        fisioterapeutaData.agenda[diaAgendamento] = horariosDisponiveis;
      } else {
        delete fisioterapeutaData.agenda[diaAgendamento];
      }

      await updateDoc(fisioterapeutaDoc.ref, { agenda: fisioterapeutaData.agenda });
    }

    return { success: true, id: novoId };
  } catch (error) {
    console.error("Erro ao agendar horário:", error);
    return { success: false, error: error };
  }
};


export async function getProximoAgendamento(patientId: number): Promise<any | null> {
  try {
    const appointmentsRef = collection(db, "Agendamentos");
    const appointmentQuery = query(
      appointmentsRef,
      where("id_paciente", "==", patientId),
      where("data_hora", ">=", new Date()), 
      orderBy("data_hora", "asc"),
      limit(1)
    );

    const querySnapshot = await getDocs(appointmentQuery);

    if (!querySnapshot.empty) {
      const appointmentData = querySnapshot.docs[0].data();
      if (appointmentData.data_hora && appointmentData.data_hora.toDate) {
        appointmentData.data_hora = appointmentData.data_hora.toDate();
      }
      return appointmentData;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar próximo agendamento:", error);
    throw error;
  }
};


export async function deleteAgendamento(agendamentoId: number) {
  try {
    const appointmentsRef = collection(db, 'Agendamentos');
    const appointmentQuery = query(appointmentsRef, where('id', '==', agendamentoId));
    const querySnapshot = await getDocs(appointmentQuery);
    if (!querySnapshot.empty) {
      await deleteDoc(querySnapshot.docs[0].ref);
    }
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    throw error;
  }
}
