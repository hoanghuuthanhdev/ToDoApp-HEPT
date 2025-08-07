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
  const [loadingText, setLoadingText] = useState("Đang khởi tạo...");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadDataAndWait = async () => {
      const startTime = Date.now();

      try {
        setLoadingText("Đang tải dữ liệu...");

        // Load tasks from AsyncStorage
        const tasks = await StorageService.getTasks();

        setLoadedTasks(tasks);
        setLoadingText("Dữ liệu đã sẵn sàng!");
        setIsDataLoaded(true);

        //ensure the loading screen is displayed for at least the minimum duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(500, duration - elapsedTime); 

        setTimeout(() => {
          if (onLoadingComplete) {
            onLoadingComplete(tasks);
          }
        }, remainingTime);
      } catch (error) {
        setLoadingText("Lỗi tải dữ liệu!");

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
      {!isDataLoaded && (
        <FontAwesome name="check-square-o" size={60} color="white" />
      )}
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
