
import Header from '@components/Header';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaView style={{flex:1}}>
           <Header/>s
        </SafeAreaView>
    );
};

export default App;
