export type ReduxState = {
  auth: AuthState;
  groups: GroupState;
};

export type GroupState = {
  groups: IGroup[];
  error: boolean;
  isLoading: boolean;
};

export type AuthState = {
  isAuthenticated: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  token: string;
  user: User;
  userList: User[];
};

type User = {
  _id: string;
  name: string;
  login: string;
  role: string;
  status: string;
};
