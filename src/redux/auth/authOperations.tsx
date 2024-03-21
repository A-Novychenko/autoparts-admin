import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { State } from './types';

const serverApi = axios.create({
  baseURL: 'http://localhost:3005/api',
  // baseURL: 'https://autoparts-backend.onrender.com/api',
});

const setAuthHeader = (token: string) => {
  if (token) {
    serverApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  serverApi.defaults.headers.common.Authorization = '';
};

const clearAuthHeader = () => {
  serverApi.defaults.headers.common.Authorization = '';
};

serverApi.interceptors.response.use(
  res => res,
  async e => {
    if (e.response.status === 401) {
      const refreshToken = 'persistedRefreshToken'; //get refreshToken

      try {
        const { data } = await serverApi.post('/auth/refresh', {
          refreshToken,
        });
        console.log('data', data);
        setAuthHeader(data.accessToken);
        //storage refreshToken

        return serverApi(e.config);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(e);
  }
);

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
      return rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: {
      login: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await serverApi.post('/auth/login', credentials);

      setAuthHeader(data.accessToken);

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const state: State = thunkApi.getState() as State;

    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await serverApi.get('/auth/current');

      return data.user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await serverApi.post('/auth/logout');

      clearAuthHeader();

      return true;
    } catch (e) {
      return rejectWithValue(e);
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
      return rejectWithValue(e);
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
      return rejectWithValue(e);
    }
  }
);

export const removeUser = createAsyncThunk(
  'auth/removeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await serverApi.delete(`/auth/user/${id}`);

      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
