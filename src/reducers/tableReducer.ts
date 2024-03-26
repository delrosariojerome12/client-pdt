import { createSlice } from "@reduxjs/toolkit";
import {
  getStockTODetails,
  getStockTOPosting,
  getStockTOValid,
} from "../store/actions/ims/replenishment";
import { togglePendingAndScanPIR } from "../store/actions/ims/physicalCount";
import {
  getphysicalRecord,
  getphysicalRecordDetails,
} from "../store/actions/ims/physicalCount";

import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

interface AsyncAction<T> {
  pending: string;
  fulfilled: string;
  rejected: string;
}

interface Table {
  tableData: {
    data: any[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  tableDetails: {
    data: any[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  tableDetailsTotal: {
    data: { data: []; totalItem: 0; totalscanned: 0 };
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Table = {
  tableData: {
    data: [],
    status: "idle",
  },
  tableDetails: {
    data: [],
    status: "idle",
  },
  tableDetailsTotal: {
    data: {
      totalItem: 0,
      totalscanned: 0,
      data: [],
    },
    status: "idle",
  },
};

const createAsyncReducerCases = <T>(
  builder: ActionReducerMapBuilder<any>,
  asyncAction: AsyncAction<T>,
  stateKey: string
) => {
  return builder
    .addCase(asyncAction.pending, (state, action) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        asyncState.status = "loading";
      }
    })
    .addCase(asyncAction.fulfilled, (state, action: any) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        const { data, paginating } = action.payload;

        if (paginating) {
          asyncState.data = [...asyncState.data, ...data.data];
          console.log("paginating fetch");
        } else {
          console.log("normal fetch");

          asyncState.data = data.data || data;
        }
        asyncState.status = "success";
      }
    })
    .addCase(asyncAction.rejected, (state, action) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        asyncState.status = "failed";
      }
    });
};

const tableReducer = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleClearTableData: (state, action) => {
      state.tableData.data = [];
      state.tableData.status = "idle";
    },
  },
  extraReducers(builder) {
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTOValid.pending.type,
        fulfilled: getStockTOValid.fulfilled.type,
        rejected: getStockTOValid.rejected.type,
      },
      "tableData"
    );
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTOPosting.pending.type,
        fulfilled: getStockTOPosting.fulfilled.type,
        rejected: getStockTOPosting.rejected.type,
      },
      "tableData"
    );
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTODetails.pending.type,
        fulfilled: getStockTODetails.fulfilled.type,
        rejected: getStockTODetails.rejected.type,
      },
      "tableDetails"
    );

    createAsyncReducerCases(
      builder,
      {
        pending: getphysicalRecord.pending.type,
        fulfilled: getphysicalRecord.fulfilled.type,
        rejected: getphysicalRecord.rejected.type,
      },
      "tableData"
    );

    builder
      .addCase(getphysicalRecordDetails.pending, (state, action) => {
        state.tableDetailsTotal.status = "loading";
      })
      .addCase(getphysicalRecordDetails.fulfilled, (state, action) => {
        state.tableDetailsTotal.status = "success";
        state.tableDetailsTotal.data = action.payload;
      })
      .addCase(getphysicalRecordDetails.rejected, (state, action) => {
        state.tableDetailsTotal.status = "failed";
      });

    builder
      .addCase(togglePendingAndScanPIR.pending, (state, action) => {
        state.tableDetailsTotal.status = "loading";
      })
      .addCase(togglePendingAndScanPIR.fulfilled, (state, action) => {
        state.tableDetailsTotal.status = "success";
        state.tableDetailsTotal.data = action.payload;
      })
      .addCase(togglePendingAndScanPIR.rejected, (state, action) => {
        state.tableDetailsTotal.status = "failed";
      });
  },
});

export const { handleClearTableData } = tableReducer.actions;

export default tableReducer.reducer;
