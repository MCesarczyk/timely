import { TaskList } from "./types";

export const isTaskListValid = (taskList: any): taskList is TaskList => {
  return taskList && Array.isArray(taskList);
}
