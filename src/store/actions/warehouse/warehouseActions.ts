import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../store";

interface FetchPTOPayload {
  limit: number;
  offset: number;
}

export const getPTO = createAsyncThunk(
  "pto/getPTO",
  async ({limit, offset}: FetchPTOPayload, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const {ipAddress, port, protocol} = state.auth.server;

      const url = `${protocol}://${ipAddress}:${port}/api/getAllPTO?limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
