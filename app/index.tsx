import Footer from '@components/Footer';
import Header from '@components/Header';
import TaskItem from '@components/TaskItem';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const App = () => {
    const insets = useSafeAreaInsets();
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ 
                flex: 1,
                paddingTop: insets.top, 
                paddingBottom: insets.bottom 
            }}>
                {/* Header - Fixed top */}
                <Header />
                
                {/* Main Content - Scrollable middle */}
                <ScrollView 
                    style={styles.mainContent}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <TaskItem
                        id={'1'}
                        title="Sample Task 1"
                        completed={false}
                        onToggle={(id) => console.log('Toggle:', id)}
                        onPress={(id) => console.log('Press:', id)}
                        onDelete={(id) => console.log('Delete:', id)}
                    />
                    <TaskItem
                        id={'2'}
                        title="Sample Task 2"
                        completed={true}
                        onToggle={(id) => console.log('Toggle:', id)}
                        onPress={(id) => console.log('Press:', id)}
                        onDelete={(id) => console.log('Delete:', id)}
                    />
                    <TaskItem
                        id={'3'}
                        title="Sample Task 3"
                        completed={false}
                        onToggle={(id) => console.log('Toggle:', id)}
                        onPress={(id) => console.log('Press:', id)}
                        onDelete={(id) => console.log('Delete:', id)}
                    />

                </ScrollView>
                
                {/* Footer - Fixed bottom */}
                <Footer />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    mainContent: {
        flex: 1, // Chiếm toàn bộ không gian giữa header và footer
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingVertical: 10,
        paddingBottom: 20, // Extra space at bottom
    },
});

export default App;