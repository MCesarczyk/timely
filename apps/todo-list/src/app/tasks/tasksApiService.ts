import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restApi } from "app/tasks/tasksApiAdapter";
import { isTaskListValid, isTaskValid } from "./typeguards";

export const tasksApiService = {
  useGetTasks: () => {
    const { data, isLoading, error } = useQuery(['tasks'], () => restApi.getTasks());

    const taskList = isTaskListValid(data) ? data : [];

    return {
      taskList,
      isLoading,
      error,
    };
  },

  useGetTask: (id: string) => {
    const { data, isLoading, error } = useQuery(['task', { id }], () => restApi.getTask(id));

    const task = isTaskValid(data) ? data : null;

    return {
      task,
      isLoading,
      error,
    };
  },

  useCreateTask: () => {
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

  useUpdateTask: () => {
    const queryClient = useQueryClient();

    return useMutation(restApi.updateTask, {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
        queryClient.invalidateQueries(['task']);
      },
    });
  },

  useDeleteTask: () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isLoading, isSuccess } = useMutation(restApi.deleteTask, {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      },
    });

    return {
      deleteTask,
      isLoading,
      isSuccess,
    };
  }
};