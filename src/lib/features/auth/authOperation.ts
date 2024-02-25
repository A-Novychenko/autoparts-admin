import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_SERVER_URL = 'http://localhost:3005/api';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: {
      email: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(`${BASE_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = res.json();

      console.log('data', data);

      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
