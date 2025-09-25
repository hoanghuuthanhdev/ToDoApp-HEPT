import { Task } from "@/types/Task";
import Footer from "@components/Footer";
import Header from "@components/Header";
import SimpleLoadingScreen from "@components/LoadingScreen";
import CreateModel from "@components/ModalCreate";
import UpdateModal from "@components/ModalUpdateTask";
import OnboardingSteps from "@components/OnboardingSteps";
import TaskItem from "@components/TaskItem";
import { ThemeProvider, useTheme } from "@contexts/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "@utils/Storage";
import * as Notifications from "expo-notifications";
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
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const insets = useSafeAreaInsets();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.filter((task) => !task.deleted)
  );
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(initialTasks.filter((task) => !task.deleted));
  }, [initialTasks]);
  
  // Ensure filteredTasks is updated when tasks change
  useEffect(() => {
    setFilteredTasks(prevFiltered => {
      const updatedFiltered = prevFiltered.filter(task => tasks.some(t => t.id === task.id && !t.deleted));
      return updatedFiltered;
    });
  }, [tasks]);
  
  const handleFilteredTasksChange = useCallback((filtered: Task[]) => {
    setFilteredTasks(filtered);
  }, []);

  const handleAddNewTask = async (newTask: Task) => {
    await StorageService.addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);

    if (newTask.dueDate) {
      const dueDate = new Date(newTask.dueDate);
      const notifyDate = new Date(dueDate.getTime() - 60 * 60 * 1000);
      if (notifyDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Sắp đến hạn nhiệm vụ!",
            body: `Nhiệm vụ "${newTask.title}" sẽ hết hạn lúc ${dueDate.toLocaleString()}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notifyDate,
          },
        });
      }
    }
  };

  const handleHideTask = (id: string) => {
    const taskToHide = tasks.find((task) => task.id === id);
    StorageService.softDeleteTask(id);
    
    // Update state immediately to prevent showing in dropdown
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    
    if (taskToHide) {
      setTimeout(() => {
        Toast.show({
          type: "info",
          text1: "Đã chuyển vào thùng rác!",
          text2: `"${taskToHide.title}" đã được chuyển vào thùng rác`,
          position: "bottom",
          bottomOffset: 120,
          visibilityTime: 2000,
        });
      }, 500);
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

        await StorageService.updateTask(id, { completed: !task.completed });

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
    await StorageService.softDeleteTask(id);
    
    // Update state immediately to prevent showing in dropdown
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    
    if (taskToDelete) {
      Toast.show({
        type: "error",
        text1: "Đã chuyển vào thùng rác!",
        text2: `"${taskToDelete.title}" đã được chuyển vào thùng rác`,
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
      await StorageService.updateTask(updatedTask.id, updatedTask);

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
            Chill thôi bro &quot; &quot;
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
              removeClippedSubviews={false} // Disable for better animation
              scrollEventThrottle={16}
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
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenOnboarding");
        setShowOnboarding(!seen);
        setOnboardingChecked(true);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setShowOnboarding(true); // Default to showing onboarding if error
        setOnboardingChecked(true);
      }
    };
    checkOnboarding();
  }, []);

  // Add a timeout to prevent infinite loading if something goes wrong
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!onboardingChecked) {
        console.warn('Onboarding check timeout, proceeding without onboarding');
        setShowOnboarding(false);
        setOnboardingChecked(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [onboardingChecked]);

  const handleLoadingComplete = (loadedTasks: Task[]) => {
    setInitialTasks(loadedTasks);
    setIsLoading(false);
  };

  const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setShowOnboarding(false);
    } catch (error) {
      console.error("Error saving onboarding status:", error);
      // Still hide onboarding even if save fails to prevent infinite loop
      setShowOnboarding(false);
    }
  };

  // Show loading screen while checking onboarding and loading tasks
  if (isLoading || !onboardingChecked) {
    return (
      <SimpleLoadingScreen
        onLoadingComplete={handleLoadingComplete}
        duration={2500}
      />
    );
  }

  if (showOnboarding) {
    return <OnboardingSteps onFinish={handleFinishOnboarding} />;
  }

  return (
    <ThemeProvider>
      <MainContent initialTasks={initialTasks} />
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
