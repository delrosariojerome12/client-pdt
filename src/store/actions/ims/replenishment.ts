import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

interface FetchPayload {
  limit: number;
  offset: number;
  paginating?: boolean;
}
interface FetchDocnumDetails {
  docnum: string;
}

export const getStockTOValid = createAsyncThunk(
  "ims/getStockTOValid",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWHREPTO_Outbound?posted=0&limit=${limit}&offset=${offset}&category=validation`;

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
export const getStockTOPosting = createAsyncThunk(
  "ims/getStockTOPosting",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWHREPTO_Outbound?posted=0&limit=${limit}&offset=${offset}&category=posting`;

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

export const getStockTODetails = createAsyncThunk(
  "ims/getStockTODetails",
  async ({ docnum }: FetchDocnumDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWHREPTOOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
