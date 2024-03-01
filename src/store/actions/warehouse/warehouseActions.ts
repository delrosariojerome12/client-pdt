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

interface PutawayDetails {
  limit: number;
  offset: number;
  paginating?: boolean;
  // category: "PUR" | "WHS" | "SRTO";
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

export const getPUR = createAsyncThunk(
  "pto/getPUR",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=PUR&limit=${limit}&offset=${offset}}`;

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

export const getWHS = createAsyncThunk(
  "pt/getWHS",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=WHS&limit=${limit}&offset=${offset}}`;

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

export const getSRTO = createAsyncThunk(
  "pt/getSRTO",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=SRTO&limit=${limit}&offset=${offset}}`;

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

export const getWTO = createAsyncThunk(
  "pt/getSRTO",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=SRTO&limit=${limit}&offset=${offset}}`;

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

export const getSRTODetails = createAsyncThunk(
  "pto/getSRTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSRTODetails/?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
