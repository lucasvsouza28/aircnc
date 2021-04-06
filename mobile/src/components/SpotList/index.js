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

import {
    Container,
    Title,
    Bold,
    ItemContainer,
    ItemImage,
    CompanyText,
    PriceText,
    Button,
    ButtonText,
} from './styles';

import api from '../../services/api';

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
        <Container>
            <Title>Empresas que usam <Bold>{tech}</Bold></Title>
            <FlatList
                style={{
                    paddingHorizontal: 20
                }}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ItemContainer
                        key={item._id}
                        style={styles.spot}>
                        <ItemImage source={{ uri: item.thumbnail_url }} />
                        <CompanyText>{item.company}</CompanyText>
                        <PriceText>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</PriceText>
                        <Button
                            style={styles.button}
                            onPress={() => handleBooking(item._id)}>                                
                            <ButtonText style={styles.buttonText}>Solicitar reserva</ButtonText>
                        </Button>
                    </ItemContainer>
                )}
            />
            
        </Container>
    );
}

export default withNavigation(SpotList);