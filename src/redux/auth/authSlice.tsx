import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authOperations';
import { AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (st, action) => {
        st.isAuthenticated = action.payload!;
      })
      .addCase(login.rejected, st => {
        st.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (st, action) => {
        st.isAuthenticated = action.payload!;
      })
      .addCase(logout.rejected, st => {
        st.isAuthenticated = true;
      });
  },
});

export const authReducer = authSlice.reducer;
