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
  refnum: string;
}

export const getphysicalRecord = createAsyncThunk(
  "ims/getPIR",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;
      const { userDetails } = state.auth.user;
      const config = {
        headers: {
          Authorization: `Bearer ${userDetails?.token}`,
        },
      };

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/physicalcountfile31?validate=or:%5BN,0%5D&trncde=PHC&_limit=${limit}&_offset=${offset}&_sortby=trndte:DESC,refnum:DESC`;

      const response = await axios.get(url, config);

      return {
        data: response.data,
        paginating: paginating,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getphysicalRecordDetails = createAsyncThunk(
  "ims/getPIRDetails",
  async (
    { docnum, refnum }: FetchDocnumDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPIROutboundDetails?docnum=${docnum}&refnum=${refnum}&showpending=true&showscanned=true`;

      const response = await axios.get(url);
      console.log("daan", url);
      console.log("sukli", response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const togglePendingAndScanPIR = createAsyncThunk(
  "ims/togglePendingScanPIR",
  async (
    {
      showPending,
      showScanned,
      docnum,
      refnum,
    }: {
      showPending: boolean;
      docnum: string;
      refnum: string;
      showScanned: boolean;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getPIROutboundDetails?docnum=${docnum}&refnum=${refnum}&showpending=${showPending}&showscanned=${showScanned}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
