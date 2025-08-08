import { Task } from "@/types/Task";
import Footer from "@components/Footer";
import Header from "@components/Header";
import SimpleLoadingScreen from "@components/LoadingScreen";
import CreateModel from "@components/ModalCreate";
import UpdateModal from "@components/ModalUpdateTask";
import TaskItem from "@components/TaskItem";
import { ThemeProvider, useTheme } from "@contexts/context";
import { StorageService } from "@utils/Storage";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const MainContent = ({ initialTasks }: { initialTasks: Task[] }) => {
  const { colors, filter } = useTheme();
  // Add state for update modal (likely near your other state declarations)
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined); 

  const insets = useSafeAreaInsets();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  //state to receive filtered task from the header
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(()=>{
    setTasks(initialTasks);
  },[initialTasks])

  //callback to receive filtered tasks from the header
  const handleFilteredTasksChange = useCallback((filtered: Task[]) => {
    setFilteredTasks(filtered);
  }, []);

  const handleAddNewTask = async (newTask: Task) => {
    //save to asynchStorage
    await StorageService.addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleHideTask = (id: string) => {
    const taskToHide = tasks.find((task) => task.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    if (taskToHide) {
      Toast.show({
        type: "info",
        text1: "Đã ẩn nhiệm vụ",
        text2: `"${taskToHide.title}" đã được ẩn`,
        position: "bottom",
        bottomOffset: 120,
        visibilityTime: 2000,
      });
    }
  };

  const handleCreateModal = () => {
    setCreateModalVisible(true);
  };

  const handleToggleTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);

      if (task) {
        const updatedTask = { ...task, completed: !task.completed };

        // Update in AsyncStorage
        await StorageService.updateTask(id, { completed: !task.completed });

        // Update local state
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );

        Toast.show({
          type: task.completed ? "info" : "success",
          text1: task.completed ? "Đã bỏ hoàn thành" : "Đã hoàn thành",
          text2: `"${task.title}"`,
          position: "bottom",
          bottomOffset: 150,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể cập nhật trạng thái",
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 3000,
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    //delete from asyncStorage
    await StorageService.deleteTask(id);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    if (taskToDelete) {
      Toast.show({
        type: "error",
        text1: "Đã xóa!",
        text2: `"${taskToDelete.title}" đã được xóa`,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 3000,
      });
    }
  };

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setUpdateModalVisible(true);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      // update in AsyncStorage
      await StorageService.updateTask(updatedTask.id, updatedTask);

      // update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // close modal and reset selectedTask
      setUpdateModalVisible(false);
      setSelectedTask(undefined);

      Toast.show({
        type: "success",
        text1: "Đã cập nhật!",
        text2: `"${updatedTask.title}" đã được cập nhật`,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể cập nhật nhiệm vụ",
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 3000,
      });
    }
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

  const renderEmptyComponent = () => {
    // if there is not task
    if (tasks.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require("@assets/images/chill.png")}
            style={{ width: 240, height: 240, marginBottom: 24 }}
            resizeMode="contain"
          />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Chill thôi bro''''''
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.text }]}>
            Nhấn nút + để tạo nhiệm vụ đầu tiên
          </Text>
        </View>
      );
    }

    // if there is task but the filter has no tasks
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Không tìm thấy nhiệm vụ
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.text }]}>
          Thử thay đổi bộ lọc để xem nhiệm vụ khác
        </Text>
      </View>
    );
  };

  // function convert filter
  const getFilterDisplayName = (filterValue: string): string => {
    const filterNames = {
      all: "📋Tất cả",
      done: "✅Hoàn thành",
      exprired: "⚠️Hết hạn",
    };
    return filterNames[filterValue as keyof typeof filterNames] || filterValue;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: colors.background,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* Header */}
          <Header
            tasks={tasks}
            onFilteredTasksChange={handleFilteredTasksChange}
          />

          <View
            style={{
              padding: 10,
              backgroundColor: "lightgray",
              paddingStart: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {getFilterDisplayName(filter)}
            </Text>
          </View>

          {/* FlatList */}
          {!createModalVisible && !updateModalVisible && (
            <FlatList
              data={filteredTasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item.id}
              style={[
                styles.mainContent,
                { backgroundColor: colors.background },
              ]}
              contentContainerStyle={[
                styles.flatListContent,
                filteredTasks.length === 0 && styles.emptyContentContainer,
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
  const [isLoading, setIsLoading] = useState(true);
  const [initialTasks, setInitialTasks] = useState<Task[]>([]);

  const handleLoadingComplete = (loadedTasks: Task[]) => {
    setInitialTasks(loadedTasks);
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <SimpleLoadingScreen
        onLoadingComplete={handleLoadingComplete}
        duration={2500}
      />
    );
  }
  return (
    <ThemeProvider>
      <MainContent initialTasks={initialTasks}/>
    </ThemeProvider>
  );
};

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
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  separator: {
    height: 10,
  },
});

export default App;
