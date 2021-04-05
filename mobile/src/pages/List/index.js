import React, { useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import socketio from 'socket.io-client'
import AsyncStorage from '@react-native-community/async-storage'

import logo from '../../assets/logo.png';

import api from '../../services/api';
import SpotList from '../../components/SpotList.js';

export default function List(){

    const [spots, setSpots] = useState([]);
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
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>

            <ScrollView>
                {techsArray.map((t, i) => <SpotList key={i} tech={t} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 40
    }
});