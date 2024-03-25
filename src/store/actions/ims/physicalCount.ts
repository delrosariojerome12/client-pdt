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

export const getphysicalRecord = createAsyncThunk(
  "ims/getphysicalRecord",
  async (
    { limit, offset, paginating }: FetchPayload,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const { ipAddress, port, protocol } = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/lst_tracc/physicalcountfile31?validate=or:%5BN,0%5D&trncde=PHC&_limit=${limit}&_offset=${offset}&_sortby=trndte:DESC,refnum:DESC`;

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
