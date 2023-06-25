import axios from "axios";
import { Task } from "domain/tasks/types";
import { API_URLS } from "infra/tasks/tasksApiUrls";

export const restApi = {
  getTasks: async () => {
    const response = await axios.get(API_URLS.getTasks);
    const tasks = await response.data;
    return tasks;
  },

  getTask: async (id: string) => {
    const response = await axios.get(API_URLS.getTask.replace(':todoId', id));
    const task = await response.data;
    return task;
  },

  createTask: async (task: Task) => {
    const response = await axios.post(API_URLS.createTask, task);
    const createdTask = await response.data;
    return createdTask;
  },

  updateTask: async (task: Task) => {
    const response = await axios.put(API_URLS.updateTask.replace(':todoId', String(task.id)), task);
    const updatedTask = await response.data;
    return updatedTask;
  },

  deleteTask: async (id: number) => {
    const response = await axios.delete(API_URLS.deleteTask.replace(':todoId', String(id)));
    const deletedTask = await response.data;
    return deletedTask;
  },
};
