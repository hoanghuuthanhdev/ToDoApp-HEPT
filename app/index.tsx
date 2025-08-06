import { ThemeProvider } from '@contexts/context';
import Footer from '@components/Footer';
import Header from '@components/Header';
import CreateModel from '@components/ModalCreate';
import UpdateModal from '@components/ModalUpdateTask';
import TaskItem from '@components/TaskItem';
import { useTheme } from '@contexts/context';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
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

const MainContent = () => {
    const { colors } = useTheme();
    // Add state for update modal (likely near your other state declarations)
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined); // or appropriate task type

    const insets = useSafeAreaInsets();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([
    ]);

    const handleAddNewTask = (newTask: Task) => {
        console.log('Adding new task:', newTask);
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleHideTask = (id: string) => {
        const taskToHide = tasks.find(task => task.id === id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

        if (taskToHide) {
            Toast.show({
                type: 'info',
                text1: 'Đã ẩn nhiệm vụ',
                text2: `"${taskToHide.title}" đã được ẩn`,
                position: 'bottom',
                bottomOffset: 120,
                visibilityTime: 2000,
            });
        }
    };

    const handleCreateModal = () => {
        console.log('Opening create modal...');
        setCreateModalVisible(true);
    };

    const handleToggleTask = (id: string) => {
        console.log('Toggle task:', id);
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
        console.log('Delete task:', id);
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
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setSelectedTask(taskToEdit);
            setUpdateModalVisible(true);

        }
    };

    const handleUpdateTask = (updatedTask: Task) => {
        console.log('Updating task:', updatedTask);

        // Cập nhật task trong danh sách
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );

        // Đóng modal và reset selectedTask
        setUpdateModalVisible(false);
        setSelectedTask(undefined);

        Toast.show({
            type: 'success',
            text1: 'Đã cập nhật!',
            text2: `"${updatedTask.title}" đã được cập nhật`,
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
            onHide={handleHideTask}
        />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image
                source={require('@assets/images/chill.png')}
                style={{ width: 240, height: 240, marginBottom: 24 }}
                resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Chill thôi bro''''''</Text>
            <Text style={styles.emptySubtitle}>Nhấn nút + để tạo nhiệm vụ đầu tiên</Text>
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ flex: 1 }}>
                <View style={[styles.mainContainer, {
                    backgroundColor: colors.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                }]}>
                    {/* Header */}
                    <Header />

                    {/* FlatList */}
                    {!createModalVisible && !updateModalVisible && (
                        <FlatList
                            data={tasks}
                            renderItem={renderTaskItem}
                            keyExtractor={(item) => item.id}
                            style={[styles.mainContent, { backgroundColor: colors.background }]}
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
                {selectedTask && (
                    <UpdateModal
                        modalVisible={updateModalVisible}
                        setModalVisible={setUpdateModalVisible}
                        updateTask={handleUpdateTask}
                        TaskData={selectedTask}
                    />
                )}
                <Toast />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};
const App = () => {
    return (
        <ThemeProvider>
            <MainContent />
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
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