import styled from 'styled-components/native';
import {
    Platform,
} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: "padding",
    enabled: Platform.OS === 'ios',
})`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const FormImageContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const FormImage = styled.Image`
    margin-bottom: 20px;
`;

export const Form = styled.View`
    align-self: stretch;
    padding: 0 30px;
    margin-top: 30px;
`;

export const FormFieldSet = styled.View``;

export const FormLabel = styled.Text`
    font-weight: bold;
    color: #444;
    margin-bottom: 8px;
`;

export const FormInput = styled.TextInput`
    border-width: 1px;
    border-color: #ddd;
    padding: 0 20px;
    font-size: 16px;
    color: #444;
    height: 44px;
    margin-bottom: 20px;
    border-radius: 2px;
`;

export const Button = styled.View`
    height: 42px;
    background-color: #f05a5b;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
`;
