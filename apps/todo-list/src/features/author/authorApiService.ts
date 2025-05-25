import { useQuery } from "@tanstack/react-query";

import { restApi } from "./authorApiAdapter";
import { isRepoListValid } from "./typeguards";

export const authorApiService = {
  useGetAuthorRepos: () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['author'], queryFn: restApi.getRepos });

    const reposList = isRepoListValid(data) ? data : [];

    return { reposList, isLoading, error };
  }
};