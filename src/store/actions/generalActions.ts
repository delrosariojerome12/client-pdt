import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

interface FetchDocnumDetails {
  docnum: string;
  req_category:
    | "wrr"
    | "lpnum"
    | "lpnnum_wto"
    | "lpnnum_srto"
    | "wrr_wto"
    | "lpnnum_srto"
    | "wrr_wto_outbound"
    | "lpnnum_wto_outbound"
    | "wpto"
    | "wpto_item"
    | "cc"
    | "cc_item"
    | "sloc"
    | "sloc_item"
    | "sloc_bin"
    | "pir"
    | "pir_item"
    | "whrepto"
    | "whrepto_item"
    | "whrepto_bin"
    | "bnt"
    | "bnt_item"
    | "bnt_bin"
    | "spl"
    | "spl_item"
    | "dts"
    | "dts_item"
    | "tms_shop_doc"
    | "tms_SO_item";
}

export const getDocument = createAsyncThunk(
  "general/getDocument",
  async (
    {docnum, req_category}: FetchDocnumDetails,
    {rejectWithValue, getState}
  ) => {
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
