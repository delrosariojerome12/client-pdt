import { createSlice } from "@reduxjs/toolkit";
import { DeliveryToSupplier } from "../../models/ims/DeliveryToSupplier";
import {
  getDTSValid,
  getDTSPosting,
  getDTSDetails,
} from "../../store/actions/ims/subcon";

interface SubCon {
  deliveryToSupplier: {
    validation: {
      data: DeliveryToSupplier[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: DeliveryToSupplier[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
  deliveryToSupplierDetails: {
    data: any[];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: SubCon = {
  deliveryToSupplier: {
    validation: { data: [], status: "idle" },
    forPosting: {
      data: [],
      status: "idle",
    },
  },
  deliveryToSupplierDetails: {
    data: [],
    status: "idle",
  },
};

const subConReducer = createSlice({
  name: "subcon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDTSValid.pending, (state, action) => {
        state.deliveryToSupplier.validation.status = "loading";
      })
      .addCase(getDTSValid.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.deliveryToSupplier.validation.data = [
            ...state.deliveryToSupplier.validation.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.deliveryToSupplier.validation.data = data.data;
        }
        state.deliveryToSupplier.validation.status = "success";
      })
      .addCase(getDTSValid.rejected, (state, action) => {
        state.deliveryToSupplier.validation.status = "failed";
      });

    builder
      .addCase(getDTSPosting.pending, (state, action) => {
        state.deliveryToSupplier.forPosting.status = "loading";
      })
      .addCase(getDTSPosting.fulfilled, (state, action) => {
        const { data, paginating } = action.payload;
        if (paginating) {
          console.log("paginating");
          state.deliveryToSupplier.forPosting.data = [
            ...state.deliveryToSupplier.forPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.deliveryToSupplier.forPosting.data = data.data;
        }
        state.deliveryToSupplier.forPosting.status = "success";
      })
      .addCase(getDTSPosting.rejected, (state, action) => {
        state.deliveryToSupplier.forPosting.status = "failed";
      });

    builder
      .addCase(getDTSDetails.pending, (state, action) => {
        state.deliveryToSupplierDetails.status = "loading";
      })
      .addCase(getDTSDetails.fulfilled, (state, action) => {
        state.deliveryToSupplierDetails.status = "success";
        state.deliveryToSupplierDetails.data = action.payload.data;
      })
      .addCase(getDTSDetails.rejected, (state, action) => {
        state.deliveryToSupplierDetails.status = "failed";
      });
  },
});

export const {} = subConReducer.actions;

export default subConReducer.reducer;
