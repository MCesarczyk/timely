export interface Task {
  title: string;
  content: string;
  done: boolean;
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export type TaskList = Task[];
