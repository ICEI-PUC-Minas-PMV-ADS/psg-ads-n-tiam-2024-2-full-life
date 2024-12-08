import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { AnamneseFormFisioterapeuta } from '../../components/AnamneseFormFisioterapeuta';
import { BarraSuperior } from '../../components/BarraSuperior';
import { CampoDeEntrada } from '../../components/CampoDeEntrada';
import { getPacientes, Pacientes } from '../../services/pacienteService';
import { useNavigation } from '@react-navigation/native';


export default function AnamneseFisioterapeuta() {
    const navigation = useNavigation();
    const [exames, setExames] = useState<string[]>([]);
    const [laudos, setLaudos] = useState<string[]>([]);
    const [pacientes, setPacientes] = useState<string[]>([]);
    const [paciente, setPaciente] = useState<string>('');
    const [pacientesDoBanco, setPacientesDoBanco] = useState<Pacientes[]>([]);
    const [idPacienteSelecionado, setIdPacienteSelecionado] = useState<string | null>(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const pacientesDoBanco = await getPacientes();
                setPacientesDoBanco(pacientesDoBanco);
                setPacientes(pacientesDoBanco.map((paciente) => paciente.nome));
            } catch (error) {
                console.error("Erro ao buscar pacientes:", error);
            }
        };

        fetchPacientes();
    }, []);

    useEffect(() => {
        if (paciente.trim() !== '') {
            const pacienteSelecionado = pacientesDoBanco.find(p => p.nome.toLowerCase() === paciente.toLowerCase());
            if (pacienteSelecionado) {
                setIdPacienteSelecionado(pacienteSelecionado.id.toString());
            } else {
                console.log('Paciente não encontrado');
                setIdPacienteSelecionado(null);
            }
        } else {
            setIdPacienteSelecionado(null);
        }
    }, [paciente, pacientesDoBanco]);

    const handleAddExame = () => {
        const newExame = `Exame ${exames.length + 1}`;
        setExames([...exames, newExame]);
    };

    const handleAddLaudo = () => {
        const newLaudo = `Laudo ${laudos.length + 1}`;
        setLaudos([...laudos, newLaudo]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <BarraSuperior titulo="FullLife" />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Anamnese</Text>
                <Text style={styles.subtitle}>Selecione o paciente:</Text>
                
                <CampoDeEntrada
                    placeholder="Paciente"
                    value={paciente}
                    onChangeText={(text) => setPaciente(text)}
                    options={pacientes}
                />

                <Text style={styles.subtitle}>Clique para ampliar</Text>

                <AnamneseFormFisioterapeuta idPacienteDoBanco={Number(idPacienteSelecionado)} />

                <TouchableOpacity
                    style={styles.button_input}
                    onPress={handleAddExame}
                >
                    <Text style={styles.buttonTextInput}>Adicionar Exame</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button_input}
                    onPress={handleAddLaudo}
                >
                    <Text style={styles.buttonTextInput}>Adicionar Laudo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdicionarTratamentos' as never)}>
                    <Text style={styles.buttonText}>Exercícios</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    button_input: {
        backgroundColor: '#D3D3D3',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonTextInput: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    fileName: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
});
