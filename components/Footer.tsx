import React from 'react';
import { StyleSheet, View } from "react-native";
import AddButton from './AddButton';

interface FooterProps {
    onCreateTask: () => void;
}
const Footer: React.FC<FooterProps> = ({ onCreateTask }) => {

    return (
        <View style={styles.container}>
            <AddButton
                onPress={onCreateTask}
                icon='plus'
                iconLibrary='FontAwesome'
                text=''
                backgroundColor='#7A85C1'
                size='small'
                animated={true}
                variant='secondary'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#456882',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default Footer;