import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../store";

interface FetchPayload {
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

// INBOUND
export const getPTO = createAsyncThunk(
  "inbound/getPTO",
  async (
    {limit, offset, paginating}: FetchPayload,
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
  "inbound/getPUR",
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
  "wto/getWHS",
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
  "wto/getSRTO",
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
  "inbound/getWTO",
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
  "inbound/getPTODetails",
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
  "inbound/getSRTODetails",
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

// OUTBOUND

export const getWTOOutboundValid = createAsyncThunk(
  "outbound/getWTOValid",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWTO_Outbound?posted=0&canceldoc=0&trntypcde=WHSTOOUT&limit=${limit}&category=validation&offset=${offset}`;

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

export const getWTOOutboundPost = createAsyncThunk(
  "outbound/getWTOPost",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWTO_Outbound?posted=0&canceldoc=0&trntypcde=WHSTOOUT&limit=${limit}&category=posting&offset=${offset}`;

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

export const getWTOOutboundDetails = createAsyncThunk(
  "inbound/getSRTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWTOOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      console.log("xxx", response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
