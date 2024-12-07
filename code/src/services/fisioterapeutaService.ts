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


export async function saveFisioterapeuta(fisioterapeutaData: Fisioterapeuta) {
  try {
    const fisioterapeutaRef = doc(db, `Fisioterapeutas/${fisioterapeutaData.id}`);
    await setDoc(fisioterapeutaRef, fisioterapeutaData);
  } catch (error) {
    throw error;
  }
};


export async function getLoggedInTherapist(): Promise<Fisioterapeuta | null> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const therapistRef = doc(db, "Fisioterapeutas", user.uid);
  const therapistSnapshot = await getDoc(therapistRef);

  if (therapistSnapshot.exists()) {
    return therapistSnapshot.data() as Fisioterapeuta;
  }

  return null;
}

export async function getNomeFisioterapeuta(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;

  const therapistRef = doc(db, "Fisioterapeutas", user.uid);
  const therapistDoc = await getDoc(therapistRef);
  if (!therapistDoc.exists()) return null;

  const { nome } = therapistDoc.data();
  return nome || null;
}

export async function getTherapistId(): Promise<number | null> {
  const { currentUser } = getAuth();

  if (!currentUser) {
    return null;
  }
  const therapistRef = doc(db, 'Fisioterapeutas', currentUser.uid);

  try {
    const therapistDoc = await getDoc(therapistRef);
    return therapistDoc.exists() ? therapistDoc.data()?.id || null : null;
  } catch (error) {
    console.error('Erro ao acessar o documento do fisioterapeuta:', error);
    return null;
  }
}