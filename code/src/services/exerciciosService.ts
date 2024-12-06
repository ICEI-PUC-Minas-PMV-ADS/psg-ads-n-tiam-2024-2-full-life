import { db } from "./firebaseConnection";
import { collection, addDoc, getDocs  } from "firebase/firestore";

class ExerciciosService {
  constructor() {
    this.exerciciosCollection = collection(db, "Exercicios");
    this.anatomiaCollection = collection(db, "Anatomia");
  }

  async adicionarExercicio(anatomia, nome, observacoes) {
    try {
      const docRef = await addDoc(this.exerciciosCollection, {
        Anatomia: anatomia,
        Nome: nome,
        Observacoes: observacoes,
      });
      console.log("Documento adicionado com ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
      throw error;
    }
  }

  async listarExercicios() {
    try {
      const querySnapshot = await getDocs(this.exerciciosCollection);
      const exercicios = [];
      querySnapshot.forEach((doc) => {
        exercicios.push({ id: doc.id, ...doc.data() });
      });
      return exercicios;
    } catch (error) {
      console.error("Erro ao listar exercícios:", error);
      throw error;
    }
  }

  async listarAnatomias() {
    try {
      const querySnapshot = await getDocs(this.anatomiaCollection);
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
}

export default new ExerciciosService();
