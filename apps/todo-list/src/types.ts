export interface Descriptions {
  [key: string]: {
    [property: string]: string;
  };
}

export interface Task {
  content: string;
  done: boolean;
  id: string;
}
