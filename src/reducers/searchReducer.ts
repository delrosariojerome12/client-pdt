import { createSlice } from "@reduxjs/toolkit";
import {
  getBinNum,
  getItem,
  getWarehouse,
} from "../store/actions/generalActions";
import { warehouseDetail } from "../models/generic/warehouseDetail";
import { ItemModel } from "../models/generic/item";
import { BinModel } from "../models/generic/bin";

type Status = "idle" | "loading" | "success" | "failed";

interface searchProps {
  warehouse: { data: warehouseDetail[]; status: Status };
  item: { data: ItemModel[]; status: Status };
  binnum: { data: BinModel[]; status: Status };
  warehouseText: any | null;
  binNoText: string;
  itemText: string;
}
const initialState: searchProps = {
  warehouse: { data: [], status: "idle" },
  item: { data: [], status: "idle" },
  binnum: { data: [], status: "idle" },
  warehouseText: null,
  binNoText: "",
  itemText: "",
};

export const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleSetWarehouse: (state, action) => {
      state.warehouseText = action.payload;
    },
    handleSetBinText: (state, action) => {
      state.binNoText = action.payload;
    },
    handleSetItemText: (state, action) => {
      state.itemText = action.payload;
    },
    resetSearch: (state) => {
      state.warehouseText = "";
      state.binNoText = "";
      state.itemText = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouse.pending, (state) => {
        state.warehouse.status = "loading";
      })
      .addCase(getWarehouse.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.warehouse.data = [...state.warehouse.data, ...data];
        } else {
          console.log("normal fetch");
          state.warehouse.data = data;
        }
        state.warehouse.status = "success";
      })
      .addCase(getWarehouse.rejected, (state) => {
        state.warehouse.status = "failed";
      });
    builder
      .addCase(getItem.pending, (state) => {
        state.item.status = "loading";
      })
      .addCase(getItem.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.item.data = [...state.item.data, ...data];
        } else {
          console.log("normal fetch");
          state.item.data = data;
        }
        state.item.status = "success";
      })
      .addCase(getItem.rejected, (state) => {
        state.item.status = "failed";
      });
    builder
      .addCase(getBinNum.pending, (state) => {
        state.binnum.status = "loading";
      })
      .addCase(getBinNum.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.binnum.data = [...state.binnum.data, ...data];
        } else {
          console.log("normal fetch");
          state.binnum.data = data;
        }
        state.binnum.status = "success";
      })
      .addCase(getBinNum.rejected, (state) => {
        state.binnum.status = "failed";
      });
  },
});

export const {
  handleSetWarehouse,
  handleSetBinText,
  handleSetItemText,
  resetSearch,
} = searchReducer.actions;

export default searchReducer.reducer;
