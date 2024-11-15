import { getFirestore, collection, getDocs } from "firebase/firestore";

async function fetchAgendamentos() {
  const db = getFirestore();
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

export default fetchAgendamentos;
