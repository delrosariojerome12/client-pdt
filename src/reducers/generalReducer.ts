import { createSlice } from "@reduxjs/toolkit";
import { getBatch } from "../store/actions/generalActions";
import { getCompany } from "../store/actions/generalActions";

interface Batch {
  recid: number;
  batchnum: string;
  supcde: string;
  supdsc: string;
  mfgdte: string; // Assuming date strings in "YYYY-MM-DD" format
  expdte: string; // Assuming date strings in "YYYY-MM-DD" format
  itmcde: string;
  itmdsc: string;
}

interface Company {
  recid: number;
  comcde: string;
  comdsc: string;
}

type Status = "idle" | "loading" | "success" | "failed";

interface GeneralProps {
  batch: {
    data: Batch[] | [];
    status: Status;
  };
  batchDetails: {
    batchNo: string;
    mfgDate: Date;
    expDate: Date;
    batchedSaved: boolean;
  };
  batchPostMode: "postUpdateBatch" | "updateBatch";
  company: { data: Company[] | [] };
}

const initialState: GeneralProps = {
  batch: { data: [], status: "idle" },
  batchDetails: {
    batchNo: "",
    expDate: new Date(),
    mfgDate: new Date(),
    batchedSaved: false,
  },
  batchPostMode: "updateBatch",
  company: { data: [] },
};

const generalReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    setMfgDate: (state, action) => {
      state.batchDetails.mfgDate = action.payload;
    },
    setExpDate: (state, action) => {
      state.batchDetails.expDate = action.payload;
    },
    setBatchNo: (state, action) => {
      state.batchDetails.batchNo = action.payload;
    },
    setBatchedSaved: (state, action) => {
      state.batchDetails.batchedSaved = action.payload;
    },
    setBatchPostMode: (
      state,
      action: { payload: "postUpdateBatch" | "updateBatch" }
    ) => {
      state.batchPostMode = action.payload;
    },
    clearBatchDetails: (state) => {
      state.batchDetails.batchNo = "";
      state.batchDetails.expDate = new Date();
      state.batchDetails.mfgDate = new Date();
      state.batchDetails.batchedSaved = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBatch.pending, (state, action) => {
        state.batch.status = "loading";
      })
      .addCase(getBatch.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.batch.data = [...state.batch.data, ...data];
        } else {
          console.log("normal fetch");
          state.batch.data = data;
        }
        state.batch.status = "success";
      })
      .addCase(getBatch.rejected, (state, action) => {
        state.batch.status = "failed";
      });
    builder.addCase(getCompany.fulfilled, (state, action) => {
      state.company.data = action.payload;
    });
  },
});

export const {
  setBatchNo,
  setMfgDate,
  setExpDate,
  clearBatchDetails,
  setBatchedSaved,
  setBatchPostMode,
} = generalReducer.actions;

export default generalReducer.reducer;
