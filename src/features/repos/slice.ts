import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepoAPI } from '@app/types';

interface InitialState {
  list: RepoAPI[];
}

const initialState: InitialState = {
  list: [],
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos: (state, action: PayloadAction<RepoAPI[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setRepos } = reposSlice.actions;

export default reposSlice.reducer;
