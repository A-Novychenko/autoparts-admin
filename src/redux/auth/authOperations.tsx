import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:3005/api',
});

export const addUser = createAsyncThunk(
  'auth/addUser',
  async (
    credentials: {
      name: FormDataEntryValue | null;
      login: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
      role: FormDataEntryValue | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await serverApi.post('/auth/register', credentials);

      return data.user;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: {
      email: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await serverApi.post('/auth/login', credentials);
      console.log('res', res);

      return true;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await serverApi.post('/auth/logout');
      console.log('res', res);

      return false;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await serverApi.get('/auth/user');

      return data.users;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const changeStatus = createAsyncThunk(
  'auth/changeStatus',
  async (credentials: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const { data } = await serverApi.patch('/auth/status', credentials);

      return data.user;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const removeUser = createAsyncThunk(
  'auth/removeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await serverApi.delete(`/auth/user/${id}`);

      return data.user;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
