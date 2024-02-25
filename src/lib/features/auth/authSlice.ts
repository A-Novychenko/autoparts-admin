import { createSlice } from '@reduxjs/toolkit';
import { login } from './authOperation';

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, st => {
      st.isLoggedIn = true;
    });
  },
});

export const authReducer = authSlice.reducer;
