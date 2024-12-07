import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore();

interface Fisioterapeuta {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  especialidades: string[];
  numero_crefito: string;
  senha: string;
  agenda: { [date: string]: string[] };
}

export async function fetchAgendamentos(): Promise<{ [date: string]: string[] }> {
  const agendamentosByDate: { [date: string]: string[] } = {};

  try {
    const fisioterapeutasCollection = collection(db, "Fisioterapeutas");
    const snapshot = await getDocs(fisioterapeutasCollection);

    if (snapshot.empty) {
      return agendamentosByDate;
    }

    snapshot.forEach((document) => {
      const { agenda } = document.data() as Fisioterapeuta;

      if (!agenda) {
        return;
      }

      Object.entries(agenda).forEach(([date, horarios]) => {
        if (!Array.isArray(horarios)) {
          console.warn(`Horários para a data ${date} não são um array:`, horarios);
          return;
        }

        if (!agendamentosByDate[date]) {
          agendamentosByDate[date] = [];
        }

        agendamentosByDate[date] = [...new Set([...agendamentosByDate[date], ...horarios])];
      });
    });

    return agendamentosByDate;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
};



