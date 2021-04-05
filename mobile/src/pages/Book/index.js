import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';

function Book({ navigation }){
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spot/${navigation.getParam('id')}/bookings`, { date }, {
            headers: {
                user_id
            }
        });

        Alert.alert('Solicitação de reserva enviada');

        await navigation.navigate('List');
    }

    async function handleCancel(){
        await navigation.navigate('List');
    }
    
    const [date, setDate] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Data de interesse</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                    ></TextInput>
                <Text style={styles.label}>TECNOLOGIAS</Text>                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButton: {
        backgroundColor: '#ccc'
    }
});

export default withNavigation(Book);