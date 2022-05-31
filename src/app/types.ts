export interface RepoAPI {
  name: string;
  description: string;
  id: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
  homepage: string;
  topics: string[];
}
