import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../store";

interface FetchPTOPayload {
  limit: number;
  offset: number;
  paginating?: boolean;
}
interface FetchDocnumDetails {
  docnum: string;
}

export const getPTO = createAsyncThunk(
  "pto/getPTO",
  async (
    {limit, offset, paginating}: FetchPTOPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getAllPTO?limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const paginatePTO = createAsyncThunk(
  "pto/refetchPTO",
  async ({limit, offset}: FetchPTOPayload, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getAllPTO?limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPTODetails = createAsyncThunk(
  "pto/getPTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPTODetails/?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
