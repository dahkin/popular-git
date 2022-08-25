import { RepoAPI } from '@app/types';

/**
 * Get data from api
 */
export const apiFetchRepos = (): Promise<RepoAPI[]> => {
  return fetch(`https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc`, {
    headers: new Headers({
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token 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',
    }),
  })
    .then((response) => response.json())
    .then((data) => data.items);
};
