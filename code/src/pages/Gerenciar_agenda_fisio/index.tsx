import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import { Botao } from '../../components/Botao';
import { CalendarioGerenciar } from '../../components/CalendarioGerenciar';
import { BarraSuperior } from '../../components/BarraSuperior';
import { db } from '../../services/firebaseConnection';
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

const ID_FISIOTERAPEUTA = 2;

export default function GerenciarHorarios() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [agenda, setAgenda] = useState<{ [key: string]: string[] }>({});

  const horariosDisponiveis = Array.from({ length: 24 }, (_, i) => {
    const hora = String(i).padStart(2, '0');
    return `${hora}:00`;
  });


  useEffect(() => {
    const carregarAgenda = async () => {
      try {
        const fisioterapeutasRef = collection(db, 'Fisioterapeutas');
        const q = query(fisioterapeutasRef, where("id", "==", ID_FISIOTERAPEUTA));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setAgenda(data.agenda || {});
        } else {
          Alert.alert('Erro', 'Fisioterapeuta não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao carregar a agenda:', error);
        Alert.alert('Erro', 'Não foi possível carregar a agenda.');
      }
    };

    carregarAgenda();
  }, []);


  const selecionarData = (data: Date) => {
    const dia = data.toLocaleDateString('pt-BR');
    setDataSelecionada(data);
    setHorarios(agenda[dia] || []);
  };

  const adicionarHorario = async (horario: string) => {
    if (!dataSelecionada) {
      Alert.alert('Erro', 'Selecione uma data para adicionar o horário.');
      return;
    }

    const dia = dataSelecionada.toLocaleDateString('pt-BR');
    if (agenda[dia]?.includes(horario)) {
      Alert.alert('Erro', 'Este horário já foi adicionado.');
      return;
    }

    const horariosAtualizados = agenda[dia] ? [...agenda[dia], horario] : [horario];
    const novaAgenda = { ...agenda, [dia]: horariosAtualizados };

    try {
      const fisioterapeutasRef = collection(db, 'Fisioterapeutas');
      const q = query(fisioterapeutasRef, where("id", "==", ID_FISIOTERAPEUTA));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Erro', `Fisioterapeuta com ID ${ID_FISIOTERAPEUTA} não encontrado.`);
        return;
      }

      const docRef = doc(db, 'Fisioterapeutas', querySnapshot.docs[0].id);
      await updateDoc(docRef, { agenda: novaAgenda });
      setAgenda(novaAgenda);
      setHorarios(horariosAtualizados);
      Alert.alert('Sucesso', 'Horário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar horário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o horário.');
    }
  };


  const removerHorario = async (horario: string) => {
    if (!dataSelecionada) return;

    const dia = dataSelecionada.toLocaleDateString('pt-BR');
    const horariosAtualizados = agenda[dia]?.filter((h) => h !== horario) || [];
    const novaAgenda = { ...agenda, [dia]: horariosAtualizados };

    try {
      const fisioterapeutasRef = collection(db, 'Fisioterapeutas');
      const q = query(fisioterapeutasRef, where("id", "==", ID_FISIOTERAPEUTA));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Erro', `Fisioterapeuta com ID ${ID_FISIOTERAPEUTA} não encontrado.`);
        return;
      }

      const docRef = doc(db, 'Fisioterapeutas', querySnapshot.docs[0].id);
      await updateDoc(docRef, { agenda: novaAgenda });
      setAgenda(novaAgenda);
      setHorarios(horariosAtualizados);
      Alert.alert('Sucesso', 'Horário removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover horário:', error);
      Alert.alert('Erro', 'Não foi possível remover o horário.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarraSuperior titulo='FullLife' />
      <Text style={styles.titulo}>Gerenciar Horários</Text>
      <CalendarioGerenciar
        dataSelecionada={dataSelecionada}
        aoSelecionarData={selecionarData}
      />

      <Text style={styles.subtitulo}>Horários do dia selecionado:</Text>
      {dataSelecionada && (
        <FlatList
          data={horarios}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemHorario}>
              <Text style={styles.textoHorario}>{item}</Text>
              <Botao
                titulo="Remover"
                onPress={() => removerHorario(item)}
                style={styles.botaoRemover}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>Nenhum horário disponível para o dia selecionado.</Text>
          }
        />
      )}

      <Text style={styles.subtitulo}>Escolha um novo horário:</Text>
      <FlatList
        data={horariosDisponiveis}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemHorario}>
            <Text style={styles.textoHorario}>{item}</Text>
            <Botao
              titulo="Adicionar"
              onPress={() => adicionarHorario(item)}
              style={styles.botaoAdicionar}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  itemHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 15, 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textoHorario: {
    fontSize: 16,
  },
  textoVazio: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
  botaoRemover: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
