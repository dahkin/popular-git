import { RepoAPI } from '@app/types';

/**
 * Get data from api
 */
export const apiFetchRepos = (): Promise<RepoAPI[]> => {
  return fetch(`https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc`)
    .then((response) => response.json())
    .then((data) => data.items);
};
