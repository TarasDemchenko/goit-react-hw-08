import { createAsyncThunk } from '@reduxjs/toolkit';
import { repetaApi } from '../auth/operations';

// axios.defaults.baseURL = `https://6707b5768e86a8d9e42c96f3.mockapi.io`;

export const fetchContacts = createAsyncThunk(
  'fetchData',
  async (_, thunkApi) => {
    try {
      const { data } = await repetaApi.get(`/contacts`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteData',
  async (id, thunkApi) => {
    try {
      const { data } = await repetaApi.delete(`/contacts/${id}`);
      return data.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactThaunk = createAsyncThunk(
  'addData',
  async (body, thunkApi) => {
    try {
      const { data } = await repetaApi.post(`/contacts`, body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
