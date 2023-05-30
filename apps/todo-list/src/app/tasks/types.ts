export interface Task {
  id: string;
  content: string;
  done: boolean;
};

export type TaskList = Task[];
