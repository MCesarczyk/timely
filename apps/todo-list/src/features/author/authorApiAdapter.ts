import axios from "axios";

import { API_URLS } from "./authorApiUrls";

export const restApi = {
  getRepos: async () => {
    const response = await axios.get(API_URLS.getAuthorRepos);
    const repos = await response.data;
    return repos;
  }
};
