import { useQuery } from "@tanstack/react-query";

import { restApi } from "./authorApiAdapter";
import { isRepoListValid } from "domain/author/typeguards";

export const authorApiService = {
  useGetAuthorRepos: () => {
    const { data, isLoading, error } = useQuery(['author'], restApi.getRepos);

    const reposList = isRepoListValid(data) ? data : [];

    return { reposList, isLoading, error };
  }
};