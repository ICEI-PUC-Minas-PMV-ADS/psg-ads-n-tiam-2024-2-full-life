import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../../services/firebaseConnection";


export function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function createUser() {
        await createUserWithEmailAndPassword(auth, email, password)
        .then(value => {
            console.log('cadastrado com sucesso \n' + value.user.uid);
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    async function login() {
        await signInWithEmailAndPassword(auth, email, password)
        .then(value => {
            console.log('fez login com sucesso');
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    async function logout() {
        await signOut(auth)
        .then(() => {
            console.log('deslogado com sucesso');
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    return (
        <View style={styles.container}>
            <Text>Firebase App</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor={"#313131"}
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor={"#313131"}            
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                style={[styles.input, {marginBottom: 10}]}
            />
            <Button
                title="CADASTRAR"
                onPress={() => createUser()}
            />
            <Button
                title="ENTRAR"
                onPress={() => login()}
            />
            <Button
                title="SAIR"
                onPress={() => logout()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#313131",
        width: '80%',
        height: 50,
        marginTop: 5
    }
});