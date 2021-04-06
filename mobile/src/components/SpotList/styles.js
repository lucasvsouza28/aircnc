import styled from 'styled-components/native';

export const Container = styled.View`
    padding-left: 30px;
    margin-top: 20px;
`;

export const Title = styled.Text`
    font-size: 18px;
    color: #444;
    margin-bottom: 15px;
`;

export const Bold = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const ItemContainer = styled.View`
    margin-right: 15px;
`;

export const ItemImage = styled.Image`
    height: 120px;
    width: 200px;
    resize-mode: cover;
    border-radius: 2px;
`;

export const CompanyText = styled.Text`
    font-weight: bold;
    font-size: 24px;
    color: #333;
`;

export const PriceText = styled.Text`
    font-size: 15px;
    color: #999;
    margin-top: 5;
`;

export const Button = styled.TouchableOpacity`
    font-size: 15px;
    height: 32px;
    background-color: #f05a5b;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
`;