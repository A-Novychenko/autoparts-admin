import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAllGroups } from './groupOperations';
import { GroupState } from '../reduxStore';

const initialState: GroupState = {
  groups: [],
  isLoading: false,
  error: false,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup(state, action: PayloadAction<IGroup>) {
      state.groups = [...state.groups, action.payload];
    },

    updateGroup(state, action: PayloadAction<IGroup>) {
      const updatedGroup = action.payload;

      state.groups = state.groups.map(g =>
        g._id === updatedGroup._id ? updatedGroup : g
      );
    },

    deleteGroup(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.groups = state.groups.filter(g => g._id !== id);
    },
  },

  extraReducers: builder => {
    builder

      .addCase(getAllGroups.pending, st => {
        st.isLoading = true;
      })
      .addCase(getAllGroups.fulfilled, (st, action) => {
        st.groups = action.payload;
        st.isLoading = false;
      })
      .addCase(getAllGroups.rejected, () => initialState);
  },
});

export const groupReducer = groupSlice.reducer;

export const { addGroup, updateGroup, deleteGroup } = groupSlice.actions;
