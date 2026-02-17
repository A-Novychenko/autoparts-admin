import { createAsyncThunk } from '@reduxjs/toolkit';

import { serverApi } from '@/utils';

export const getAllGroups = createAsyncThunk(
  'group/getAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await serverApi.get('/cms-catalog/groups');

      return data.groups;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
