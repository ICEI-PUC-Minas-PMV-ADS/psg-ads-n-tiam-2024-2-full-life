import { collection, query, where, getDocs, updateDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebaseConnection';
import { getEmail, getId } from './pacienteService';
import { getTherapistId } from './fisioterapeutaService';

const storage = getStorage();

export async function saveAnamnesePaciente(data: any): Promise<string> {
  try {
    const enrichedData = {
        ...data,
        dataPreenchimento: new Date().toISOString(),
        id_paciente: await getId(),
        email_paciente: await getEmail(), 
      };

    const docRef = await addDoc(collection(db, 'Anamnese'), enrichedData);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar anamnese:', error);
    throw error;
  }
}

export async function saveAnamneseFisioterapeuta(data: any, idPaciente: number): Promise<string> {
    console.log('idPaciente:', idPaciente);
    try {
      const anamneseCollection = collection(db, 'Anamnese');
      
      const q = query(anamneseCollection, where('id_paciente', '==', idPaciente));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          ...data,
          id_fisioterapeuta: await getTherapistId(),
        });
        return docRef.id;
      } else {
        const newDocRef = doc(collection(db, 'Anamnese'));
        await setDoc(newDocRef, {
          id_paciente: idPaciente,
          ...data,
          id_fisioterapeuta: await getTherapistId(),
        });
        return newDocRef.id;
      }
    } catch (error) {
      console.error('Erro ao salvar anamnese:', error);
      throw error;
    }
  }

export async function uploadFile(file: any, filePath: string): Promise<string> {
  const path = `files/${filePath}`;
  try {
    const fileBlob = await fetch(file.uri).then((res) => res.blob());
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, fileBlob);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
}
