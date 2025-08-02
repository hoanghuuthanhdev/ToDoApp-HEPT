
import Header from '@components/Header';
import TaskItem from '@components/TaskItem';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <TaskItem
                    id={'1'}
                    title="Sample Task"
                    completed={false}
                    onToggle={() => { }}
                    onPress={() => { }}
                />
                <TaskItem
                    id={'1'}
                    title="Sample Task"
                    completed={false}
                    onToggle={() => { }}
                    onPress={() => { }}
                />
                <TaskItem
                    id={'1'}
                    title="Sample Task"
                    completed={false}
                    onToggle={() => { }}
                    onPress={() => { }}
                />

            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;