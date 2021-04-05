import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../assets/logo.png'

import api from '../../services/api'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{

        async function getUser(){
            const user = await AsyncStorage.getItem('user');
    
            if (user){
                //navigation.navigate('List');
            }
        }

        getUser();

    }, []);

    async function handleSubmit(){

        const response = await api.post('/user', {
            email
        });

        const { _id } = response.data;

        if (_id){
            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('techs', techs);
            navigation.navigate('List');
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}    
            behavior="padding"            
            enabled={Platform.OS === 'ios'}>
            <Image source={logo}></Image>

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    ></TextInput>
                <Text style={styles.label}>TECNOLOGIAS</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                    ></TextInput>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}