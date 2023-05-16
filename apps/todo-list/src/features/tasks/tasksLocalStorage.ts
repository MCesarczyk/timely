import { Task } from 'types';

const localStorageKey = 'tasks';

export const saveTasksInLocalStorage = (tasks: Task[]) => localStorage.setItem(localStorageKey, JSON.stringify(tasks));

export const getTasksFromLocalStorage = () => {
  const localStorageTasks = localStorage.getItem(localStorageKey);
  return localStorageTasks ? JSON.parse(localStorageTasks) : [];
};
