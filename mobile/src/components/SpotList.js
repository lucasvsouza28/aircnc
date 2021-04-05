import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';

import api from '../services/api';

function SpotList({ navigation, tech }){
    const [spots, setSpots] = useState([]);

    useEffect(()=>{
        (async function(){
            const { data } = await api.get('/spot', {
                params:{
                    tech
                }
            });
            setSpots(data);
        })();
    }, []);

    async function handleBooking(id){
        await navigation.navigate('Book', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Empresas que usam <Text style={styles.textBold}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        key={item._id}
                        style={styles.spot}>
                        <Image
                            style={styles.spotImage}
                            source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleBooking(item._id)}>                                
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        marginTop: 20
    },
    text:{
        fontSize: 18,
        color: '#444',
        marginBottom: 15
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    list:{
        paddingHorizontal: 20
    },
    spot:{
        marginRight: 15
    },
    spotImage:{
        height: 120,
        width: 200,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#333'
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        fontSize: 15,
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default withNavigation(SpotList);