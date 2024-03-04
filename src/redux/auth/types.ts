export type State = {
  auth: AuthState;
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
