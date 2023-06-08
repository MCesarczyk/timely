export interface Task {
  id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TaskList = Task[];
