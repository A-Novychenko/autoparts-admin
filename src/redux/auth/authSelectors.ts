import { State } from './types';

export const selectIsAuthenticated = (state: State) =>
  state.auth.isAuthenticated;

export const selectIsRefreshing = (state: State) => state.auth.isRefreshing;

export const selectIsActive = (state: State) => state.auth.user.status;

export const selectIsLoading = (state: State) => state.auth.isLoading;

export const selectUserRole = (state: State) => state.auth.user.role;

export const selectUser = (state: State) => state.auth.user;

export const selectUserList = (state: State) => state.auth.userList;
