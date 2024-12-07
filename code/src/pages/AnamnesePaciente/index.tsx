import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { AnamneseFormPaciente } from '../../components/AnamneseFormPaciente';
import { BarraSuperior } from '../../components/BarraSuperior';

export default function AnamnesePaciente() {
    const [exames, setExames] = useState<string[]>([]);
    const [laudos, setLaudos] = useState<string[]>([]);

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
                <Text style={styles.subtitle}>Clique para ampliar</Text>

                <AnamneseFormPaciente />

                <TouchableOpacity
                    style={styles.button_input}
                    onPress={handleAddExame}
                >
                    <Text style={styles.buttonTextInput}>Adicionar Exame</Text>
                </TouchableOpacity>

                {/* {exames.map((exame, index) => (
                    <Text key={index} style={styles.fileName}>
                        {exame}
                    </Text>
                ))} */}

                <TouchableOpacity
                    style={styles.button_input}
                    onPress={handleAddLaudo}
                >
                    <Text style={styles.buttonTextInput}>Adicionar Laudo</Text>
                </TouchableOpacity>

                {/* {laudos.map((laudo, index) => (
                    <Text key={index} style={styles.fileName}>
                        {laudo}
                    </Text>
                ))} */}

                <TouchableOpacity style={styles.button}>
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
