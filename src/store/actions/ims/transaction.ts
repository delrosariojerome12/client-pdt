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

export const getCycleCount = createAsyncThunk(
  "ims/getCycleCount",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/cyclecountfile1?validate=or:%5BN,0%5D&trncde=CYC&_limit=${limit}&_offset=${offset}&_sortby=trndte:DESC,docnum:DESC`;

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

export const getCycleCountDetails = createAsyncThunk(
  "ims/getCycleDetails",
  async ({ docnum }: FetchDocnumDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getCCOutboundDetails?docnum=${docnum}&showpending=true&showscanned=true`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const togglePendingAndScan = createAsyncThunk(
  "ims/togglePendingScan",
  async (
    {
      showPending,
      docnum,
      showScanned,
    }: { showPending: boolean; docnum: string; showScanned: boolean },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getCCOutboundDetails?docnum=${docnum}&showpending=${showPending}&showscanned=${showScanned}`;
      console.log("daan", url);

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSLOCValid = createAsyncThunk(
  "ims/getSLOCValid",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSLOC_Outbound_validation?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=validation&trntypcde=SLOC`;

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

export const getSLOCPosting = createAsyncThunk(
  "ims/getSLOCPosting",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSLOC_Outbound_posting?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=posting&trntypcde=SLOC`;

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

export const getSLOCDetails = createAsyncThunk(
  "ims/getSLOCDetails",
  async ({ docnum }: FetchDocnumDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;
      const url = `${protocol}://${ipAddress}:${port}/api/getSLOCOutboundDetails?docnum=${docnum}&showpending=true&showscanned=true`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getStockTransferValid = createAsyncThunk(
  "ims/getStockTransferValid",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getBNT_Outbound_validation?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=validation&trntypcde=BNT`;

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

export const getStockTransferPosting = createAsyncThunk(
  "ims/getStockTransferPosting",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;
      // http://192.168.100.4:5901/api/getBNT_Outbound_posting?posted=0&canceldoc=0&limit=10&offset=0&category=posting&trntypcde=BNT
      const url = `${protocol}://${ipAddress}:${port}/api/getBNT_Outbound_posting?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=posting&trntypcde=BNT`;

      console.log("daam", url);
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
