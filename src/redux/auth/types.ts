export type State = {
  auth: AuthState;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userList: User[];
};

type User = {
  _id: string;
  name: string;
  login: string;
  role: string;
  status: string;
};
