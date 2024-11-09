import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConnection";

type Agendamento = {
  id: string;
  id_paciente: string;
  id_fisioterapeuta: string;
  data_hora: string;
  status: string;
};

export const buscarHorariosDisponiveis = async (idFisioterapeuta: string, data: string) => {
  const q = query(
    collection(db, "Agendamentos"),
    where("id_fisioterapeuta", "==", idFisioterapeuta),
    where("data_hora", ">=", `${data}T00:00:00`),
    where("data_hora", "<=", `${data}T23:59:59`),
    where("status", "==", "livre")
  );

  const agendamentosSnapshot = await getDocs(q);
  const horariosDisponiveis: Agendamento[] = [];
  agendamentosSnapshot.forEach((doc) => {
    horariosDisponiveis.push({ id: doc.id, ...doc.data() } as Agendamento);
  });

  return horariosDisponiveis;
};
