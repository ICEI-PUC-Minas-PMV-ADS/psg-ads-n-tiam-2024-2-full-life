import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export async function fetchAgendamentos() {
  const agendamentosMap: { [date: string]: string[] } = {};

  try {
    const fisioterapeutasCollection = collection(db, "Fisioterapeutas");
    const snapshot = await getDocs(fisioterapeutasCollection);

    if (snapshot.empty) {
      return agendamentosMap;
    }

    snapshot.forEach((document) => {
      const documentData = document.data();
      const agendaData = documentData.agenda;

      if (!agendaData) {
        return;
      }

      Object.keys(agendaData).forEach((date) => {
        if (!agendamentosMap[date]) {
          agendamentosMap[date] = [];
        }
        agendamentosMap[date] = [...new Set([...agendamentosMap[date], ...agendaData[date]])];
      });
    });

    return agendamentosMap;
  } catch (error) {
    console.error("Failed to fetch agendamentos: ", error);
    return null;
  }
}

export async function saveFisioterapeuta(data: any) {
  try {
    const fisioterapeutaRef = doc(collection(db, "Fisioterapeutas"), data.id);
    await setDoc(fisioterapeutaRef, data);
    console.log("Fisioterapeuta cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar fisioterapeuta:", error);
    throw error;
  }
}
