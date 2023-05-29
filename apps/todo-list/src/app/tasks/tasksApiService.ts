import { useQuery } from "react-query";
import { restApi } from "services/restApi";

export const tasksApiService = {
  getTasks: () => {
    const { data, isLoading, error } = useQuery(['tasks'], () => restApi.getTasks());

    return {
      data,
      isLoading,
      error,
    };
  },

  getTask: (id: string) => {
    const { data, isLoading, error } = useQuery(['task', { id }], () => restApi.getTask(id));

    return {
      data,
      isLoading,
      error,
    };
  },
};