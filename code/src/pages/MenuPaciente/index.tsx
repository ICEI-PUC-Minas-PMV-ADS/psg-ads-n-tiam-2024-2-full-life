import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { BarraSuperior } from '../../components/BarraSuperior';
import { ButtonBlock } from '../../components/BotaoNavigation';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getNomePaciente } from '../../services/pacienteService';
import { getId } from '../../services/pacienteService';

type RootStackParamList = {
    MenuPaciente: undefined;
    Agendamentos: undefined;
    AcompanharConsultas: undefined;
    HistoricoConsultas: undefined;
    AnamnesePaciente: undefined;
};

type MenuPacienteNavigationProps = NativeStackNavigationProp<RootStackParamList, "MenuPaciente">;

export default function MenuPaciente() {
    const navigation = useNavigation<MenuPacienteNavigationProps>();

    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState<string | null>(null);
    const [userId , setUserId] = useState<number | null>(null);

    const items = [
        { title: "Realizar Agendamento", navigation: "Agendamentos" },
        { title: "Acompanhar Consultas", navigation: "AcompanharConsultas" },
        { title: "Histórico de Consultas", navigation: "HistoricoConsultas" },
        { title: "Exercícios Recomendados", navigation: "AdicionarTratamentos" },
        { title: "Anamnese", navigation: "AnamnesePaciente" },
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const idPaciente = await getId();
                setUserId(idPaciente || 0);
            } catch (error) {
                console.error("Erro ao buscar ID do paciente:", error);
                setUserId(0);
            }
        };
    
        fetchUserId();
    }, []); 
    
    useEffect(() => {
        const fetchUserName = async () => {
            if (userId) { 
                try {
                    const nomePaciente = await getNomePaciente(userId);
                    setUserName(nomePaciente || 'Paciente');
                } catch (error) {
                    console.error("Erro ao buscar nome do paciente:", error);
                    setUserName('Paciente');
                }
            }
        };
    
        fetchUserName();
    }, [userId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <BarraSuperior titulo='FullLife' />

                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Olá, {userName}</Text>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="🔍 Pesquisar..."
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                        />
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {filteredItems.map((item, index) => (
                        <ButtonBlock
                            key={index}
                            title={item.title}
                            onPress={() => navigation.navigate(item.navigation as keyof RootStackParamList)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.additionalContent}>
                    <Text>Additional Content Here</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fffff",
    },
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    greetingContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    greetingText: {
        fontSize: 18,
        marginBottom: 8,
    },
    searchBar: {
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    searchInput: {
        height: '100%',
        fontSize: 16,
        color: '#000',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 16,
    },
    additionalContent: {
        flex: 4,
        margin: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
