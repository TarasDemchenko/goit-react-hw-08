import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const repetaApi = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

const setAuthHeader = token => {
  repetaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await repetaApi.post('users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await repetaApi.post('users/login', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    await repetaApi.post('users/logout');
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk('refresh', async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  console.log(savedToken);
  if (savedToken === null) {
    return thunkApi.rejectWithValue('Token does not exist!');
  }
  setAuthHeader(savedToken);
  try {
    const { data } = await repetaApi.get('users/current');
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
