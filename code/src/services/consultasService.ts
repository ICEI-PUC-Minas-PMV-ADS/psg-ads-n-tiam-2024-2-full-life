import { db } from "./firebaseConnection";
import { collection, getDocs, where, query, Timestamp, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";

interface Consulta {
  data_hora: string;
  id_fisioterapeuta: number;
  id_paciente: number;
  observacoes: string;
  id: number; 
}

export async function getConsultas(): Promise<Consulta[]> {
  try {
    const agendamentosRef = collection(db, "Agendamentos");
    const consultasData: Consulta[] = [];
    const agendamentosSnapshot = await getDocs(agendamentosRef);

    agendamentosSnapshot.forEach((doc) => {
      const data = doc.data();
      const dataHora = data.data_hora;

      let data_hora_formatada = "";
      if (dataHora instanceof Timestamp) {
        data_hora_formatada = dataHora.toDate().toISOString();
      } else if (typeof dataHora === "string") {
        data_hora_formatada = new Date(dataHora).toISOString();
      }

      consultasData.push({
        id: parseInt(doc.id, 10), 
        data_hora: data_hora_formatada,
        id_fisioterapeuta: data.id_fisioterapeuta || 0,
        id_paciente: data.id_paciente || 0,
        observacoes: data.observacoes || "",
      });
    });

    return consultasData;
  } catch (error) {
    console.error("Erro ao buscar consultas: ", error);
    return [];
  }
}

export async function getConsultasFromConsultasCollection(): Promise<Consulta[]> {
  try {
    const consultasRef = collection(db, "Consultas");
    const consultasData: Consulta[] = [];
    const consultasSnapshot = await getDocs(consultasRef);

    consultasSnapshot.forEach((doc) => {
      const data = doc.data();
      const dataHora = data.data_hora;

      let data_hora_formatada = "";
      if (dataHora instanceof Timestamp) {
        data_hora_formatada = dataHora.toDate().toISOString();
      } else if (typeof dataHora === "string") {
        data_hora_formatada = new Date(dataHora).toISOString();
      }

      consultasData.push({
        id: parseInt(doc.id, 10),
        data_hora: data_hora_formatada,
        id_fisioterapeuta: data.id_fisioterapeuta || 0,
        id_paciente: data.id_paciente || 0,
        observacoes: data.observacoes || "",
      });
    });

    return consultasData;
  } catch (error) {
    console.error("Erro ao buscar consultas da coleção Consultas: ", error);
    return [];
  }
}

export async function getConsultasByPatientId(patientId: number): Promise<Consulta[]> {
  try {
    const today = new Date().toISOString().split('T')[0];

    const snapshot = await getDocs(
      query(
        collection(db, 'Consultas'),
        where('id_paciente', '==', patientId),
        where('data_hora', '<', `${today}T23:59:59`)
      )
    );

    if (snapshot.empty) {
      return [];
    }

    const consultas: Consulta[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: parseInt(doc.id, 10) || 0, 
        data_hora: data.data_hora || '',
        id_fisioterapeuta: Number(data.id_fisioterapeuta) || 0, 
        id_paciente: Number(data.id_paciente) || 0, 
        observacoes: data.observacoes || '', 
      };
    });

    return consultas;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw new Error('Não foi possível buscar as consultas.');
  }
}


export const fetchFisioterapeutaAgenda = async (idFisioterapeuta: number) => {
  try {
    const fisioterapeutasRef = collection(db, 'Fisioterapeutas');
    
    const q = query(fisioterapeutasRef, where("id", "==", idFisioterapeuta));
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; 
      return doc.data().agenda || {};
    }
    throw new Error(`Fisioterapeuta com ID ${idFisioterapeuta} não encontrado`);
  } catch (error) {
    console.error('Erro ao buscar a agenda:', error);
    throw error;
  }
};

export const updateFisioterapeutaAgenda = async (idFisioterapeuta: number, novaAgenda: any) => {
  const docRef = doc(db, 'Fisioterapeutas', String(idFisioterapeuta));
  await updateDoc(docRef, { agenda: novaAgenda });
};

export async function addConsulta(consulta: Consulta) {
  try {
    const consultasRef = collection(db, "Consultas");
    await addDoc(consultasRef, {
      ...consulta,
      data_hora: consulta.data_hora instanceof Date ? consulta.data_hora.toISOString() : consulta.data_hora,
    });
  } catch (error) {
    console.error("Erro ao adicionar consulta:", error);
    throw error;
  }
}