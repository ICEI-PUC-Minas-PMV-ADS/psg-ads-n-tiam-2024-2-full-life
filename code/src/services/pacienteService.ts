import { getFirestore, doc, getDoc, collection, setDoc, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export interface Pacientes {
  id: number;
  nome: string;
  data_nascimento: string;
  email: string;
  endereco: string;
  historico_medico: string;
  senha: string;
  telefone: string;
}

export async function getLoggedInPatient(): Promise<Pacientes | null> {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const patientRef = doc(db, "Pacientes", user.uid);
  const patientSnapshot = await getDoc(patientRef);

  if (patientSnapshot.exists()) {
    return patientSnapshot.data() as Pacientes;
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

export async function getNomePaciente(patientId: number): Promise<string | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'Pacientes'), where('id', '==', patientId), limit(1))
    );

    if (querySnapshot.empty) {
      return null;
    }

    const patientData = querySnapshot.docs[0].data();
    const { nome: patientName } = patientData;

    return patientName || null;
  } catch (error) {
    console.error('Erro ao buscar o nome do paciente:', error);
    return null;
  }
}

export async function getId(): Promise<number | null> {
  try {
    const usuarioAtual = auth.currentUser;

    if (!usuarioAtual) {
      console.log('Nenhum usuário está logado.');
      return null;
    }

    const emailUsuario = usuarioAtual.email;

    if (!emailUsuario) {
      console.log('Usuário não possui um e-mail registrado.');
      return null;
    }

    const snapshotPacientes = await getDocs(
      query(
        collection(db, 'Pacientes'),
        where('email', '==', emailUsuario), 
        limit(1) 
      )
    );

    if (snapshotPacientes.empty) {
      console.log('Paciente não encontrado.');
      return null;
    }

    const pacienteData = snapshotPacientes.docs[0].data();
    const idPaciente = pacienteData.id;

    if (typeof idPaciente !== 'number') {
      console.log('O atributo "id" não é um número.');
      return null;
    }

    return idPaciente;
  } catch (error) {
    console.error('Erro ao obter o atributo "id" do paciente logado:', error);
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

export async function getEmail(): Promise<string | null> {
  try{
    const usuarioAtual = auth.currentUser;

      if (!usuarioAtual) {
        console.log('Nenhum usuário está logado.');
        return null;
      }

      const emailUsuario = usuarioAtual.email;

      return emailUsuario || null;

  } catch (error) {
    console.error('Erro ao buscar o email do paciente:', error);
    return null;
  }
};

export async function getPacientes(): Promise<Pacientes[]> {
  try {
    const pacientesSnapshot = await getDocs(collection(db, "Pacientes"));
    const pacientes = pacientesSnapshot.docs.map((doc) => doc.data() as Pacientes);
    return pacientes;
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }
};

export async function getAllPacientes(): Promise<Pacientes[]> {
  try {
    const pacientesSnapshot = await getDocs(collection(db, "Pacientes"));
    const pacientes = pacientesSnapshot.docs.map((doc) => ({
      id: doc.data().id,
      nome: doc.data().nome,
    }));
    return pacientes;
  } catch (error) {
    console.error("Erro ao buscar todos os pacientes:", error);
    return [];
  }
}
