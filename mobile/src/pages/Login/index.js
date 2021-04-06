import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    FormImageContainer,
    FormImage,
    Form,
    FormFieldSet,
    FormLabel,
    FormInput,
    Button,
    ButtonText,
} from './styles';

import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{

        async function getUser(){
            const user = await AsyncStorage.getItem('user');
    
            if (user){
                navigation.navigate('List');
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
        <Container>
            <Form>
                <FormImageContainer>
                    <FormImage source={logo} />
                </FormImageContainer>
                <FormFieldSet>
                    <FormLabel>SEU E-MAIL</FormLabel>
                    <FormInput
                        placeholder="Seu e-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}/>
                </FormFieldSet>
                <FormFieldSet>
                    <FormLabel>TECNOLOGIAS</FormLabel>
                    <FormInput
                        placeholder="Tecnologias de interesse"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}/>
                </FormFieldSet>
                <Button onPress={handleSubmit}>
                    <ButtonText>Encontrar spots</ButtonText>
                </Button>
            </Form>
        </Container>
    );
}