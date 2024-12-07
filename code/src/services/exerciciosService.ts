import { db } from "./firebaseConnection";
import { collection, addDoc, getDocs, CollectionReference } from "firebase/firestore";

interface Exercicio {
  id: number;
  Anatomia: string;
  Nome: string;
  Observacoes: string;
}

interface RecomendacaoExercicio {
  id: number;
  id_fisioterapeuta: number;
  id_paciente: number | null;
  exercicios: { id: number; nome: string; observacoes: string }[];
}

interface AnatomiaData {
  Anatomias?: string[];
}

const exerciciosCollection = collection(db, "Exercicios") as CollectionReference<Exercicio>;
const anatomiaCollection = collection(db, "Anatomia") as CollectionReference<AnatomiaData>;
const recomendacoesExerciciosCollection = collection(db, 'RecomendacoesExercicios');


export async function adicionarExercicio(
  anatomia: string,
  nome: string,
  observacoes: string
): Promise<number> {
  try {
    const querySnapshot = await getDocs(exerciciosCollection);
    const exerciciosExistentes = querySnapshot.docs.map((doc) => doc.data());
    const lastId = exerciciosExistentes.reduce(
      (maxId, currentExercise) => Math.max(maxId, currentExercise.id ?? 0),
      0
    );
    const novoId = lastId + 1;

    const docRef = await addDoc(exerciciosCollection, {
      id: novoId,
      Anatomia: anatomia,
      Nome: nome,
      Observacoes: observacoes,
    });
    console.log("Documento adicionado com ID:", novoId);
    return novoId;
  } catch (error) {
    console.error("Erro ao adicionar exercício:", error);
    throw error;
  }
}

export async function listarExercicios(anatomia: string = ''): Promise<Exercicio[]> {
  try {
    let querySnapshot;
if (anatomia) {
  querySnapshot = await getDocs(exerciciosCollection);
  querySnapshot = querySnapshot.docs.filter((doc) => doc.data().Anatomia === anatomia);
} else {
  querySnapshot = (await getDocs(exerciciosCollection)).docs;
}

if (querySnapshot.length === 0) {
  return [];
}

const exercicios: Exercicio[] = [];
querySnapshot.forEach((doc) => {
  const data = doc.data();
  exercicios.push({
    ...data,
    id: parseInt(doc.id, 10),
  });
});

    return exercicios;
  } catch (error) {
    console.error("Erro ao listar exercícios:", error);
    throw error;
  }
}


export async function listarAnatomias(): Promise<string[]> {
  try {
    const querySnapshot = await getDocs(anatomiaCollection);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return data.Anatomias || [];
    } else {
      throw new Error("Nenhum documento encontrado na coleção 'Anatomia'");
    }
  } catch (error) {
    console.error("Erro ao listar anatomias:", error);
    throw error;
  }
}

export async function adicionarRecomendacaoExercicio(recomendacao: RecomendacaoExercicio): Promise<void> {
  try {
    await addDoc(recomendacoesExerciciosCollection, recomendacao);
    console.log("Recomendação de exercício adicionada com sucesso.", recomendacao);
  } catch (error) {
    console.error("Erro ao adicionar recomendação de exercício:", error);
    throw error;
  }
}