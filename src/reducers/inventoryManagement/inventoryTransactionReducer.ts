import {createSlice} from "@reduxjs/toolkit";
import {CycleCount} from "../../models/ims/CycleCount";
import {SLOC} from "../../models/ims/SLOC";
import {StockTransfer} from "../../models/ims/StockTransfer";
import {
  getCycleCount,
  getSLOCValid,
  getSLOCPosting,
  getStockTransferValid,
  getStockTransferPosting,
  getCycleCountDetails,
  togglePendingAndScan,
} from "../../store/actions/ims/transaction";

interface Transaction {
  cycle: {
    data: CycleCount[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  cycleCountDetails: {
    data: {data: any[]; totalItem: number; totalscanned: number};
    status: "idle" | "loading" | "success" | "failed";
  };
  sloc: {
    validation: {
      data: SLOC[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: SLOC[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
  stockTransfer: {
    validation: {
      data: StockTransfer[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: StockTransfer[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
}

const initialState: Transaction = {
  cycle: {data: [], status: "idle"},
  sloc: {
    validation: {data: [], status: "idle"},
    forPosting: {
      data: [],
      status: "idle",
    },
  },
  stockTransfer: {
    validation: {data: [], status: "idle"},
    forPosting: {
      data: [],
      status: "idle",
    },
  },
  cycleCountDetails: {
    data: {data: [], totalItem: 0, totalscanned: 0},
    status: "idle",
  },
};

const inventoryTransactionReducer = createSlice({
  name: "inventoryTransaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // cycle count
    builder
      .addCase(getCycleCount.pending, (state, action) => {
        state.cycle.status = "loading";
      })
      .addCase(getCycleCount.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.cycle.data = [...state.cycle.data, ...data];
        } else {
          console.log("normal fetch");
          state.cycle.data = data;
        }
        state.cycle.status = "success";
      })
      .addCase(getCycleCount.rejected, (state, action) => {
        state.cycle.status = "failed";
      });

    builder
      .addCase(getCycleCountDetails.pending, (state, action) => {
        state.cycleCountDetails.status = "loading";
      })
      .addCase(getCycleCountDetails.fulfilled, (state, action) => {
        state.cycleCountDetails.status = "success";
        state.cycleCountDetails.data = action.payload;
      })
      .addCase(getCycleCountDetails.rejected, (state, action) => {
        state.cycleCountDetails.status = "failed";
      });

    builder
      .addCase(togglePendingAndScan.pending, (state, action) => {
        state.cycleCountDetails.status = "loading";
      })
      .addCase(togglePendingAndScan.fulfilled, (state, action) => {
        state.cycleCountDetails.data = action.payload;
        state.cycleCountDetails.status = "success";
      })
      .addCase(togglePendingAndScan.rejected, (state, action) => {
        state.cycleCountDetails.status = "failed";
      });

    // SLOC
    builder
      .addCase(getSLOCValid.pending, (state, action) => {
        state.sloc.validation.status = "loading";
      })
      .addCase(getSLOCValid.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;

        if (paginating) {
          console.log("paginating");
          state.sloc.validation.data = [
            ...state.sloc.validation.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.sloc.validation.data = data.data;
        }
        state.sloc.validation.status = "success";
      })
      .addCase(getSLOCValid.rejected, (state, action) => {
        state.sloc.validation.status = "failed";
      });

    builder
      .addCase(getSLOCPosting.pending, (state, action) => {
        state.sloc.forPosting.status = "loading";
      })
      .addCase(getSLOCPosting.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.sloc.forPosting.data = [
            ...state.sloc.forPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.sloc.forPosting.data = data.data;
        }
        state.sloc.forPosting.status = "success";
      })
      .addCase(getSLOCPosting.rejected, (state, action) => {
        state.sloc.forPosting.status = "failed";
      });

    // Stock transfer
    builder
      .addCase(getStockTransferValid.pending, (state, action) => {
        state.stockTransfer.validation.status = "loading";
      })
      .addCase(getStockTransferValid.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.stockTransfer.validation.data = [
            ...state.stockTransfer.validation.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.stockTransfer.validation.data = data.data;
        }
        state.stockTransfer.validation.status = "success";
      })
      .addCase(getStockTransferValid.rejected, (state, action) => {
        state.stockTransfer.validation.status = "failed";
      });

    builder
      .addCase(getStockTransferPosting.pending, (state, action) => {
        state.stockTransfer.forPosting.status = "loading";
      })
      .addCase(getStockTransferPosting.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.stockTransfer.forPosting.data = [
            ...state.stockTransfer.forPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.stockTransfer.forPosting.data = data.data;
        }
        state.stockTransfer.forPosting.status = "success";
      })
      .addCase(getStockTransferPosting.rejected, (state, action) => {
        state.stockTransfer.forPosting.status = "failed";
      });
  },
});

export const {} = inventoryTransactionReducer.actions;

export default inventoryTransactionReducer.reducer;
