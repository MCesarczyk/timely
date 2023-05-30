import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restApi } from "services/restApi";
import { isTaskListValid, isTaskValid } from "./typeguards";

export const tasksApiService = {
  getTasks: () => {
    const { data, isLoading, error } = useQuery(['tasks'], () => restApi.getTasks());

    const taskList = isTaskListValid(data) ? data : [];

    return {
      taskList,
      isLoading,
      error,
    };
  },

  getTask: (id: string) => {
    const { data, isLoading, error } = useQuery(['task', { id }], () => restApi.getTask(id));

    const task = isTaskValid(data) ? data : null;

    return {
      task,
      isLoading,
      error,
    };
  },

  createTask: () => {
    const queryClient = useQueryClient();

    const { mutate: createTask, isLoading, isSuccess } = useMutation(restApi.createTask, {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });

    return {
      createTask,
      isLoading,
      isSuccess,
    };
  },
};