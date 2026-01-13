import { ReduxState } from '../reduxStore';

export const selectIsAuthenticated = (state: ReduxState) =>
  state.auth.isAuthenticated;

export const selectIsRefreshing = (state: ReduxState) =>
  state.auth.isRefreshing;

export const selectIsActive = (state: ReduxState) => state.auth.user.status;

export const selectIsLoading = (state: ReduxState) => state.auth.isLoading;

export const selectUserRole = (state: ReduxState) => state.auth.user.role;

export const selectUser = (state: ReduxState) => state.auth.user;

export const selectUserList = (state: ReduxState) => state.auth.userList;
