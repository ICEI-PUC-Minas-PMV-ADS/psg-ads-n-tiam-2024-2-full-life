import { getFirestore, doc, getDoc, collection, setDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

interface Paciente {
  id: number;
  nome: string;
  data_nascimento: string;
  email: string;
  endereco: string;
  historico_medico: string;
  senha: string;
  telefone: string;
}

export async function getLoggedInPatient(): Promise<Paciente | null> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const patientRef = doc(db, "Pacientes", user.uid);
  const patientSnapshot = await getDoc(patientRef);

  if (patientSnapshot.exists()) {
    return patientSnapshot.data() as Paciente;
  }

  return null;
}

export async function savePaciente(pacienteData: any) {
  const pacienteRef = doc(collection(db, "Pacientes"));

  const querySnapshot = await getDocs(collection(db, "Pacientes"));
    let maiorId = 0;
    querySnapshot.forEach((doc) => {
      const pacienteData = doc.data();
      const id = parseInt(pacienteData.id);
      if (id > maiorId) {
        maiorId = id;
      }
    });

    const novoId = maiorId + 1;

    pacienteData.id = novoId;

  try {
    await setDoc(pacienteRef, pacienteData);
  } catch (error) {
    console.error("Erro ao salvar paciente:", error);
    throw error;
  }
}

export async function getNomePaciente(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;

  const pacienteRef = doc(db, "Pacientes", user.uid);
  const pacienteDoc = await getDoc(pacienteRef);
  if (!pacienteDoc.exists()) return null;

  const { nome } = pacienteDoc.data();
  return nome || null;
}

export async function getPatientId(): Promise<number | null> {
  const { currentUser } = getAuth();

  if (!currentUser) {
    return null;
  }
  const patientRef = doc(db, 'Pacientes', currentUser.uid);

  try {
    const patientDoc = await getDoc(patientRef);
    return patientDoc.exists() ? patientDoc.data()?.id || null : null;
  } catch (error) {
    console.error('Erro ao acessar o documento do paciente:', error);
    return null;
  }
}

export async function getNextUserId(): Promise<number> {
  const pacienteCollection = collection(db, "Pacientes");
  const pacienteQuery = query(pacienteCollection, orderBy("id", "desc"), limit(1));
  const querySnapshot = await getDocs(pacienteQuery);

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0];
    return (lastDoc.data().id as number) + 1;
  } else {
    return 1; 
  }
}
