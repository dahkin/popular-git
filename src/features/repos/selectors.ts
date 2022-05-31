import { RootState } from '@app/store';
import { RepoAPI } from '@app/types';

export const getRepos = (state: RootState): RepoAPI[] => state.repos.list;
