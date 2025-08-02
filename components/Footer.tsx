import React from 'react';
import { StyleSheet, View } from "react-native";
import AddButton from './AddButton';


const Footer = () => {
    return (
        <View style={styles.container}>
            <AddButton onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#456882',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    text: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
});

export default Footer;