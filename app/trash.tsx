import TrashScreen from "@components/TrashScreen";
import { StorageService } from "@utils/Storage";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@contexts/context";
import { Task } from "@/types/Task";

export default function TrashPage() {
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    StorageService.getDeletedTasks().then(setDeletedTasks);
  }, []);

  const handleRestore = async (id: string) => {
    await StorageService.restoreTask(id);
    setDeletedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDeleteForever = async (id: string) => {
    await StorageService.deleteTask(id);
    setDeletedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <TrashScreen
            tasks={deletedTasks}
            onRestore={handleRestore}
            onDeleteForever={handleDeleteForever}
          />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}