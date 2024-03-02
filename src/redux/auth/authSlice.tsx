import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  getAllUsers,
  addUser,
  changeStatus,
  removeUser,
} from './authOperations';
import { AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  userList: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addUser.pending, st => {
        st.isLoading = true;
      })
      .addCase(addUser.fulfilled, (st, action) => {
        st.userList.push(action.payload!);
        st.isLoading = false;
      })
      .addCase(addUser.rejected, st => {
        st.isLoading = false;
      })

      .addCase(login.pending, st => {
        st.isLoading = true;
      })
      .addCase(login.fulfilled, (st, action) => {
        st.isAuthenticated = action.payload!;
      })
      .addCase(login.rejected, st => {
        st.isAuthenticated = false;
        st.isLoading = false;
      })

      .addCase(logout.pending, st => {
        st.isLoading = true;
      })
      .addCase(logout.fulfilled, (st, action) => {
        st.isAuthenticated = action.payload!;
      })
      .addCase(logout.rejected, st => {
        st.isAuthenticated = true;
        st.isLoading = false;
      })

      .addCase(getAllUsers.pending, st => {
        st.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (st, action) => {
        st.userList = action.payload!;
      })
      .addCase(getAllUsers.rejected, st => {
        st.userList = [];
        st.isLoading = false;
      })

      .addCase(changeStatus.pending, st => {
        st.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (st, { payload }) => {
        console.log('st', st);
        console.log('payload', payload);
        st.userList = st.userList.map(user => {
          if (user._id === payload._id) {
            return { ...user, status: payload.status };
          }
          return user;
        });
      })
      .addCase(changeStatus.rejected, st => {
        st.isLoading = false;
      })

      .addCase(removeUser.pending, st => {
        st.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (st, { payload }) => {
        st.userList = st.userList.filter(user => user._id !== payload._id);

        st.isLoading = false;
      })
      .addCase(removeUser.rejected, st => {
        st.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
