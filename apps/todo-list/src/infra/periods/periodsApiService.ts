import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { restApi } from "./periodsApiAdapter";
import { isPeriodListValid, isPeriodValid } from "domain/periods/typeguards";
import { useEffect, useState } from "react";

export const periodsApiService = {
  useGetPeriods: (perPage?: number) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, error } = useQuery(['periods', { perPage, page }], () => restApi.getPeriods(perPage, page), { keepPreviousData: true });

    const periodList = data && isPeriodListValid(data.data) ? data.data : [];
    const periodListTotal = data && data.total ? data.total : 0;

    const getList = (page?: number) => {
      setPage(page as number);
    };

    const nextPage = page + 1;

    useEffect(() => {
      queryClient.prefetchQuery(['periods', { perPage, nextPage }], () => restApi.getPeriods(perPage, nextPage));
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
