import Footer from '@components/Footer';
import Header from '@components/Header';
import CreateModel from '@components/ModelCreate';
import TaskItem from '@components/TaskItem';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    createdAt: Date;
}

const App = () => {
    const insets = useSafeAreaInsets();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Sample Task 1',
            description: 'First sample task',
            completed: false,
            dueDate: new Date(),
            createdAt: new Date()
        },
        {
            id: '2',
            title: 'Sample Task 2',
            description: 'Second sample task',
            completed: true,
            dueDate: new Date(),
            createdAt: new Date()
        },
        {
            id: '3',
            title: 'Sample Task 3',
            description: 'Third sample task',
            completed: false,
            dueDate: new Date(),
            createdAt: new Date()
        }
    ]);

    const handleAddNewTask = (newTask: Task) => {
        console.log('Adding new task:', newTask); // ✅ Debug log
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleCreateModal = () => {
        console.log('Opening create modal...');
        setCreateModalVisible(true);
    };

    const handleToggleTask = (id: string) => {
        console.log('Toggle task:', id); // ✅ Debug log
        const task = tasks.find(t => t.id === id);
        
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        
        if (task) {
            Toast.show({
                type: task.completed ? 'info' : 'success',
                text1: task.completed ? 'Đã bỏ hoàn thành' : 'Đã hoàn thành',
                text2: `"${task.title}"`,
                position: 'bottom',
                bottomOffset: 150,
                visibilityTime: 2000,
            });
        }
    };

    const handleDeleteTask = (id: string) => {
        console.log('Delete task:', id); // ✅ Debug log
        const taskToDelete = tasks.find(task => task.id === id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        
        if (taskToDelete) {
            Toast.show({
                type: 'error',
                text1: 'Đã xóa!',
                text2: `"${taskToDelete.title}" đã được xóa`,
                position: 'bottom',
                bottomOffset: 150,
                visibilityTime: 3000,
            });
        }
    };

    const handleEditTask = (id: string) => {
        console.log('Edit task:', id);
        Toast.show({
            type: 'info',
            text1: 'Chỉnh sửa',
            text2: 'Tính năng đang phát triển',
            position: 'bottom',
            bottomOffset: 150,
            visibilityTime: 2000,
        });
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <TaskItem
            id={item.id}
            title={item.title}
            completed={item.completed}
            onToggle={handleToggleTask}
            onPress={handleEditTask}
            onDelete={handleDeleteTask}
        />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📝</Text>
            <Text style={styles.emptyTitle}>Chưa có nhiệm vụ nào</Text>
            <Text style={styles.emptySubtitle}>Nhấn nút + để tạo nhiệm vụ đầu tiên</Text>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ flex: 1 }}>
                <View style={[styles.mainContainer, {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                }]}>
                    {/* Header */}
                    <Header />

                    {/* FlatList */}
                    {!createModalVisible && (
                    <FlatList
                        data={tasks}
                        renderItem={renderTaskItem}
                        keyExtractor={(item) => item.id}
                        style={styles.mainContent}
                        contentContainerStyle={[
                            styles.flatListContent,
                            tasks.length === 0 && styles.emptyContentContainer
                        ]}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmptyComponent}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                    )}
                    {/* Footer */}
                    <Footer onCreateTask={handleCreateModal} />
                </View>
                <CreateModel
                    modalVisible={createModalVisible}
                    setModalVisible={setCreateModalVisible}
                    addNew={handleAddNewTask}
                />
                {/* ✅ Global Toast for app actions */}
                <Toast />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    flatListContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingBottom: 100,
    },
    emptyContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    separator: {
        height: 10,
    },
});

export default App;