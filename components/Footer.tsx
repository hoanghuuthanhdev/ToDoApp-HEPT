import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import AddButton from './AddButton';
import CreateModel from './ModelCreate';


const Footer = () => {
        const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <AddButton 
            onPress={() => setModalVisible(true)}
            icon='plus'
            iconLibrary='FontAwesome'
            text=''
            backgroundColor='#7A85C1'
            size='small'
            animated={true}
            variant='secondary'
             />

            {/* Modal */}
            <CreateModel
                modalVisible={modalVisible}
                setModalVisible={setModalVisible} 
                addNew={()=>{}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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