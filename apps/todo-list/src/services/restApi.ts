import axios from "axios";
import { Task } from "~/types";
import { API_URLS } from "./apiUrls";

export const restApi = {
  getTasks: async () => {
    const response = await axios.get(API_URLS.getTasks);
    const tasks = await response.data;
    return tasks;
  },

  createTask: async (task: Task) => {
    const response = await axios.post(API_URLS.createTask, task);
    const createdTask = await response.data;
    return createdTask;
  },

  updateTask: async (task: Task) => {
    const response = await axios.put(API_URLS.updateTask.replace(':todoId', task.id), task);
    const updatedTask = await response.data;
    return updatedTask;
  },

  deleteTask: async (id: string) => {
    const response = await axios.delete(API_URLS.deleteTask.replace(':todoId', id));
    const deletedTask = await response.data;
    return deletedTask;
  },
};
