import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchRepos } from '@app/api';
import { setRepos } from './slice';

export const fetchRepos = createAsyncThunk('api/setRepos', async (_, thunk) => {
  const reposList = await apiFetchRepos();

  if (reposList !== null) {
    thunk.dispatch(setRepos(reposList));
  }
});
