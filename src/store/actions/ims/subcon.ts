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

export const getDTSValid = createAsyncThunk(
  "ims/getDTSValid",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getDTS_Outbound?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=validation`;

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
export const getDTSPosting = createAsyncThunk(
  "ims/getDTSPosting",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getDTS_Outbound?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=posting`;

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

export const getDTSDetails = createAsyncThunk(
  "ims/getDTSDetails",
  async ({ docnum }: FetchDocnumDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getDTSOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
