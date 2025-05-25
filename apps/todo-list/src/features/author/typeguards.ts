import { Repository } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRepoValid = (repo: any): repo is Repository => (
  repo &&
  typeof repo.id === "number" &&
  typeof repo.name === "string" &&
  typeof repo.description === "string" &&
  typeof repo.homepage === "string" &&
  typeof repo.html_url === "string"
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRepoListValid = (repos: any): repos is Repository[] => (
  repos && Array.isArray(repos) && repos.some((repo) => isRepoValid(repo))
);