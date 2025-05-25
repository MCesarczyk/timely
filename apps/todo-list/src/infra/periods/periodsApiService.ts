import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restApi } from "./periodsApiAdapter";
import { isPeriodListValid, isPeriodValid } from "domain/periods/typeguards";
import { useEffect, useState } from "react";

export const periodsApiService = {
  useGetPeriods: (perPage?: number) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, error } = useQuery({ queryKey: ['periods', { perPage, page }], queryFn: () => restApi.getPeriods(perPage, page) });

    const periodList = data && isPeriodListValid(data.data) ? data.data : [];
    const periodListTotal = data && data.total ? data.total : 0;

    const getList = (page?: number) => {
      setPage(page as number);
    };

    const nextPage = page + 1;

    useEffect(() => {
      queryClient.prefetchQuery({ queryKey: ['periods', { perPage, nextPage }], queryFn: () => restApi.getPeriods(perPage, nextPage) });
    }, [page, queryClient]);

    return {
      getList,
      periodList,
      periodListTotal,
      isLoading,
      error,
    };
  },

  useGetPeriod: (id: string) => {
    const { data, isLoading, error } = useQuery({ queryKey: ['period', { id }], queryFn: () => restApi.getPeriod(id) });

    const period = isPeriodValid(data) ? data : null;

    return {
      period,
      isLoading,
      error,
    };
  },

  useCreatePeriod: () => {
    const queryClient = useQueryClient();

    const { mutate: createPeriod, isPending, isSuccess } = useMutation({
      mutationFn: restApi.createPeriod, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['periods'] });
      },
    });

    return {
      createPeriod,
      isPending,
      isSuccess,
    };
  },

  useUpdatePeriod: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: restApi.updatePeriod,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['periods'] });
        queryClient.invalidateQueries({ queryKey: ['period'] });
      },
    });
  },

  useDeletePeriod: () => {
    const queryClient = useQueryClient();

    const { mutate: deletePeriod, isPending, isSuccess } = useMutation({
      mutationFn: restApi.deletePeriod,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['periods'] });
      },
    });

    return {
      deletePeriod,
      isPending,
      isSuccess,
    };
  }
};
