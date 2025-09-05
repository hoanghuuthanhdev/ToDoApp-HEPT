import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

export class StorageService {
  private static readonly TASKS_KEY = 'tasks';
  private static readonly THEME_KEY = 'theme';

  // Task Operations
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(this.TASKS_KEY, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  static async getTasks(): Promise<Task[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(this.TASKS_KEY);
      if (jsonValue != null) {
        const tasks = JSON.parse(jsonValue);
        // Convert date strings back to Date objects
        return tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  static async addTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      tasks.push({ ...task, deleted: false });
      await this.saveTasks(tasks);
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        await this.saveTasks(tasks);
      }
    } catch (error) {
      throw error;
    }
  }

  // mark tasks as deleted instead of permanently deleting them
  static async softDeleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].deleted = true;
        await this.saveTasks(tasks);
      }
    } catch (error) {
      throw error;
    }
  }

  // get list of deleted/hiden tasks

  static async getDeletedTasks(): Promise<Task[]> {
    try {
      const tasks = await this.getTasks();
      return tasks.filter(task => task.deleted);
    } catch (error) {
      return [];
    }
  }

  // restore deleted/hidden tasks 
  static async restoreTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].deleted = false;
        await this.saveTasks(tasks);
      }
    } catch (error) {
      throw error;
    }
  }

  // delete task in the Storage
  static async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      await this.saveTasks(filteredTasks);
    } catch (error) {
      throw error;
    }
  }

  // Theme Operations
  static async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await AsyncStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      throw error;
    }
  }

  static async getTheme(): Promise<'light' | 'dark'> {
    try {
      const theme = await AsyncStorage.getItem(this.THEME_KEY);
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      return 'light';
    }
  }

  // Clear all data
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  }
}