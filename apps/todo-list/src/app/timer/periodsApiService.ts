import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restApi } from "./periodsApiAdapter";
import { isPeriodListValid, isPeriodValid } from "./typeguards";

export const periodsApiService = {
  useGetPeriods: () => {
    const { data, isLoading, error } = useQuery(['periods'], () => restApi.getPeriods());

    const periodList = isPeriodListValid(data) ? data : [];

    return {
      periodList,
      isLoading,
      error,
    };
  },

  useGetPeriod: (id: string) => {
    const { data, isLoading, error } = useQuery(['period', { id }], () => restApi.getPeriod(id));

    const period = isPeriodValid(data) ? data : null;

    return {
      period,
      isLoading,
      error,
    };
  },

  useCreatePeriod: () => {
    const queryClient = useQueryClient();

    const { mutate: createPeriod, isLoading, isSuccess } = useMutation(restApi.createPeriod, {
      onSuccess: () => {
        queryClient.invalidateQueries(['periods']);
      },
    });

    return {
      createPeriod,
      isLoading,
      isSuccess,
    };
  },

  useUpdatePeriod: () => {
    const queryClient = useQueryClient();

    return useMutation(restApi.updatePeriod, {
      onSuccess: () => {
        queryClient.invalidateQueries(['periods']);
        queryClient.invalidateQueries(['period']);
      },
    });
  },

  useDeletePeriod: () => {
    const queryClient = useQueryClient();

    const { mutate: deletePeriod, isLoading, isSuccess } = useMutation(restApi.deletePeriod, {
      onSuccess: () => {
        queryClient.invalidateQueries(['periods']);
      },
    });

    return {
      deletePeriod,
      isLoading,
      isSuccess,
    };
  }
};
