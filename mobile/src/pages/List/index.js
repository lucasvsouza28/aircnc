import React, { useState, useEffect} from 'react';
import {
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import socketio from 'socket.io-client'

import {
    Container,
    Logo,
    SpotsContainer,
} from './styles';

import SpotList from '../../components/SpotList/index';

import logo from '../../assets/logo.png';

export default function List(){

    const [techsArray, setTechsArray] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.104:3000', {
                query: { user_id }
            }, { transports: ['websockets'] });

            socket.on('booking_response', req => {
                Alert.alert(`Reserva em ${req.spot.company} em ${req.date} ${req.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(()=> {
        (async function loadTechsArray(){
            const techs = await AsyncStorage.getItem('techs');
            setTechsArray(techs.split(',').map(t => t.trim()));
        })();
    }, []);

    return (
        <Container>
            <Logo source={logo} />

            <SpotsContainer>
                {techsArray.map((t, i) =>
                    <SpotList key={i} tech={t} />
                )}
            </SpotsContainer>
        </Container>
    );
}