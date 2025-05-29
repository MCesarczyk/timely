export interface Task {
  id: number;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TaskList = Task[];
