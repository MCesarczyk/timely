import { createSlice } from '@reduxjs/toolkit';
import { getTasksFromLocalStorage } from './tasksLocalStorage';
import { RootState } from 'store';
import { Task } from 'types';

interface TasksState {
  tasks: Task[];
  hideDone: boolean;
  state: string;
}

const initialState: TasksState = {
  tasks: getTasksFromLocalStorage(),
  hideDone: false,
  state: 'none',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: ({ tasks }, { payload: task }) => {
      tasks.push(task);
    },
    toggleHideDone: (state) => {
      state.hideDone = !state.hideDone;
    },
    toggleTaskDone: ({ tasks }, { payload: taskId }) => {
      const index = tasks.findIndex(({ id }) => id === taskId);
      tasks[index].done = !tasks[index].done;
    },
    removeTask: ({ tasks }, { payload: task }) => {
      const index = tasks.findIndex(({ id }) => id === task);
      tasks.splice(index, 1);
    },
    setAllDone: ({ tasks }) => {
      tasks.forEach((_task, index) => {
        tasks[index].done = true;
      });
    },
    fetchExampleTasks: () => {},
    setTasks: (state, { payload: tasks }) => {
      state.tasks = tasks;
    },
    setTasksState: (state, { payload: stateName }) => {
      state.state = stateName;
    },
  },
});

export const {
  addTask,
  toggleHideDone,
  toggleTaskDone,
  removeTask,
  setAllDone,
  fetchExampleTasks,
  setTasks,
  setTasksState,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectHideDone = (state: RootState) => state.tasks.hideDone;
export const selectState = (state: RootState) => state.tasks.state;
export const selectIfAllDone = (state: RootState) => state.tasks.tasks.every(({ done }) => done);

export const getTasksById = (state: RootState, taskId: string | undefined) =>
  selectTasks(state).find(({ id }) => id === taskId);

export const selectTasksByQuery = (state: RootState, query: string | null) => {
  const tasks = selectTasks(state);

  if (!query || query.trim() === '') {
    return tasks;
  }

  return tasks.filter(({ content }) => content.toUpperCase().includes(query.trim().toUpperCase()));
};

export default tasksSlice.reducer;
