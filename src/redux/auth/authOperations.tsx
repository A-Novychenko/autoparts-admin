import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { State } from './types';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const serverApi = axios.create({
  baseURL: `${serverUrl}/api`,
});

const setAuthHeader = (token: string) => {
  if (token) {
    serverApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  serverApi.defaults.headers.common.Authorization;
};

type Tokens = {
  token: string;
};

let onTokenUpdate: ((newTokens: Tokens) => void) | undefined;
let onIsAuthenticated: (() => void) | undefined;

export const setTokenUpdateCallback = (
  callback: (newTokens: Tokens) => void
) => {
  onTokenUpdate = callback;
};

export const setLogoutIsAuthenticatedCallback = (callback: () => void) => {
  onIsAuthenticated = callback;
};

serverApi.interceptors.response.use(
  res => res,
  async e => {
    console.log('BEFORE');
    if (e.response && e.response.status === 401 && !e.config._retry) {
      e.config._retry = true;

      console.log('AFTER');

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('Refresh token missing');
        }

        const { data } = await serverApi.post('/auth/refresh', {
          refreshToken,
        });

        console.log('data!!!QQ!!', data);

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        console.log('newAccessToken', newAccessToken);
        console.log('newRefreshToken', newRefreshToken);

        setAuthHeader(newAccessToken);

        localStorage.setItem('refreshToken', newRefreshToken);

        if (onTokenUpdate) {
          onTokenUpdate({
            token: newAccessToken,
          });
        }

        e.config.headers['authorization'] = `Bearer ${newAccessToken}`;

        return serverApi(e.config);
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          // Axios-помилка
          console.error('Token refresh failed (Axios):', refreshError.message);

          if (refreshError.response?.status === 403) {
            if (onIsAuthenticated) {
              onIsAuthenticated();
            }
          }
        } else if (refreshError instanceof Error) {
          // Загальна помилка
          console.error('Token refresh failed (Error):', refreshError.message);
        } else {
          // Помилка невідомого типу
          console.error('Token refresh failed (Unknown):', refreshError);
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(e);
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

      console.log('auth/login_data', data);
      console.log('auth/login_data_refreshToken', data.refreshToken);

      setAuthHeader(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

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

    console.log('persistedToken', persistedToken);

    if (persistedToken === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    console.log('persistedToken', persistedToken);

    try {
      setAuthHeader(persistedToken);
      const { data } = await serverApi.get('/auth/current');

      console.log('data', data);

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkApi.rejectWithValue(e.message || 'Unknown error occurred');
      } else {
        return thunkApi.rejectWithValue('Unknown error occurred');
      }
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await serverApi.post('/auth/logout');

      setAuthHeader('');

      return true;
    } catch (e) {
      return rejectWithValue(e);
    }
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
