import { State } from './types';

export const selectIsAuthenticated = (state: State) => state.auth.userList;

export const selectIsLoading = (state: State) => state.auth.isLoading;

export const selectUserList = (state: State) => state.auth.userList;
