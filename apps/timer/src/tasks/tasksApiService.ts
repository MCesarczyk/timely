import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restApi } from "./tasksApiAdapter";
import { isTaskListValid, isTaskValid } from "./typeguards";

export const tasksApiService = {
  useGetTasks: () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['tasks'], queryFn: () => restApi.getTasks() });

    const taskList = isTaskListValid(data) ? data : [];

    return {
      taskList,
      isLoading,
      error,
    };
  },

  useGetTask: (id: string) => {
    const { data, isLoading, error } = useQuery({ queryKey: ['task', { id }], queryFn: () => restApi.getTask(id) });

    const task = isTaskValid(data) ? data : null;

    return {
      task,
      isLoading,
      error,
    };
  },

  useCreateTask: () => {
    const queryClient = useQueryClient();

    const { mutate: createTask, isPending, isSuccess } = useMutation({
      mutationFn: restApi.createTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });

    return {
      createTask,
      isPending,
      isSuccess,
    };
  },

  useUpdateTask: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: restApi.updateTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        queryClient.invalidateQueries({ queryKey: ['task'] });
      },
    });
  },

  useDeleteTask: () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending, isSuccess } = useMutation({
      mutationFn: restApi.deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });

    return {
      deleteTask,
      isPending,
      isSuccess,
    };
  }
};