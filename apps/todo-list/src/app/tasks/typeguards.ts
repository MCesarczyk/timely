import { Task, TaskList } from "./types";

export const isTaskListValid = (taskList: any): taskList is TaskList => {
  return taskList && Array.isArray(taskList);
}

export const isTaskValid = (task: any): task is Task => {
  return (
    task &&
    typeof task.id === "number" &&
    typeof task.content === "string" &&
    typeof task.done === "boolean"
  );
}
