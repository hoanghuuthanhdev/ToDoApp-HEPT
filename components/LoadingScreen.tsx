import { Task } from "@/types/Task";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StorageService } from "@utils/Storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SimpleLoadingScreenProps {
  onLoadingComplete?: (tasks: Task[]) => void;
  duration?: number;
}

const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({
  onLoadingComplete,
  duration = 2500,
}) => {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadDataAndWait = async () => {
      const startTime = Date.now();

      try {
        const tasks = await StorageService.getTasks();
        setLoadedTasks(tasks);
        setIsDataLoaded(true);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(500, duration - elapsedTime); 

        setTimeout(() => {
          if (onLoadingComplete) {
            onLoadingComplete(tasks);
          }
        }, remainingTime);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setIsDataLoaded(true);
        setTimeout(() => {
          if (onLoadingComplete) {
            onLoadingComplete([]);
          }
        }, 1000);
      }
    };

    loadDataAndWait();
  }, [duration, onLoadingComplete]);

  return (
    <View style={styles.container}>
      <FontAwesome name="check-square-o" size={60} color="white" />
      <Text style={styles.loadingText}>
        {isDataLoaded ? `Đã tải ${loadedTasks.length} nhiệm vụ` : 'Đang khởi tạo...'}
      </Text>
      <ActivityIndicator 
        size="large" 
        color="white" 
        style={{ marginTop: 16 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#456882",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    maxWidth: 300,
    maxHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  taskCountText: {
    marginTop: 8,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
});

export default SimpleLoadingScreen;
