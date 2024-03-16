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

// INBOUND //

// PTO
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
// PUR
export const getPUR = createAsyncThunk(
  "inbound/getPUR",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=PUR&limit=${limit}&offset=${offset}`;
      console.log(url);

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
// WHS
export const getWHS = createAsyncThunk(
  "wto/getWHS",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=WHS&limit=${limit}&offset=${offset}`;

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
// SRTO
export const getSRTO = createAsyncThunk(
  "wto/getSRTO",
  async (
    {limit, offset, paginating}: PutawayDetails,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPutawayTO/?category=SRTO&limit=${limit}&offset=${offset}`;

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

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/warehousetransferorderfile1?trntypcde=WHSTOIN&posted=0&canceldoc=0&trndte=nev2:null&_limit=${limit}&_sortby=trndte:DESC,docnum:DESC&_offset=${offset}`;

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
// PTO-DETAILS
export const getPTODetails = createAsyncThunk(
  "inbound/getPTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPTODetails/?docnum=${docnum}`;

      const response = await axios.get(url);

      console.log("kuha", response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// WTO-DETAILS
export const getWTODetails = createAsyncThunk(
  "inbound/getWTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWTODetails/?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// SRTO-DETAILS
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

// OUTBOUND //

// WTO-OUTBOUND-VALID
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
// WTO-OUTBOUND-POSTING
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

// WTO-OUTBOUND-VALID-SELECT
export const getWTOOutboundDetails = createAsyncThunk(
  "inbound/getSRTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWTOOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// WAVEPICK-VALID
export const getWPTOValid = createAsyncThunk(
  "outbound/getWPTOValid",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWPTO_Outbound?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=validation`;

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
// WAVEPICK-POST
export const getWPTOPost = createAsyncThunk(
  "outbound/getWPTOPost",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWPTO_Outbound?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=posting`;

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

// WAVEPICK-VALID-SELECT
export const getWPTODetails = createAsyncThunk(
  "outbound/getWPTODetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getWPTOOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// SINGLE-PICK PK-VALIDATE
export const getPKValidate = createAsyncThunk(
  "outbound/getPKValidate",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSPL_Outbound_pkval?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=pk_validation`;

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
// SINGLE-PICK INV-POSTING
export const getINVPosting = createAsyncThunk(
  "outbound/getINVPosting",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSPL_Outbound_invpost?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=inv_posting`;

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
// SINGLE-PICK STG-VALIDATE
export const getSTGValidate = createAsyncThunk(
  "outbound/getSTGValidate",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSPL_Outbound_stgval?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=stg_validation`;

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
// SINGLE-PICK SPL-POSTING
export const getSPLPosting = createAsyncThunk(
  "outbound/getSPLPosting",
  async (
    {limit, offset, paginating}: FetchPayload,
    {rejectWithValue, getState}
  ) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSPL_Outbound_stgpost?posted=0&canceldoc=0&limit=${limit}&offset=${offset}&category=spl_posting`;

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

// PK DETAILS
// SAME AS WPTO DETAILS
//

// STG-VALIDATE DETAILS
export const getSTGValidateDetails = createAsyncThunk(
  "outbound/getSTGDetails",
  async ({docnum}: FetchDocnumDetails, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getSPLOutboundDetails?docnum=${docnum}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
