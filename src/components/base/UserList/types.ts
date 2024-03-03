export type UserListProps = {
  users: User[];
};

type User = {
  _id: string;
  name: string;
  login: string;
  role: string;
  status: string;
};

export type Column = {
  id: 'name' | 'login' | 'password' | 'role' | 'status' | 'editor';
  label: string;
};

export type ColumnData = {
  id: string;
  label: string;
};
