import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = axios.create({
  baseURL: "http://localhost:3005/api",
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      email: FormDataEntryValue | null;
      password: FormDataEntryValue | null;
    },
    {rejectWithValue}
  ) => {
    try {
      const res = await serverApi.post("/auth/login", credentials);
      console.log("res", res);

      return true;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      const res = await serverApi.post("/auth/logout");
      console.log("res", res);

      return false;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
