import {createSlice} from "@reduxjs/toolkit";
import {
  getPTO,
  getPTODetails,
  getPUR,
  getWHS,
  getSRTO,
  getSRTODetails,
} from "../../store/actions/warehouse/warehouseActions";
import {PTOData} from "../../models/warehouse/inbound/PTO";
import {PURData} from "../../models/warehouse/inbound/PUR";
import {SRTOData} from "../../models/warehouse/inbound/SRTO";
import {ProductData} from "../../models/generic/ProductData";

interface Inbound {
  pto: {
    data: PTOData[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  ptoDetails: {
    data: ProductData[];
    status: "idle" | "loading" | "success" | "failed";
  };
  pur: {
    data: PURData[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  whs: {
    data: PURData[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  srto: {
    data: SRTOData[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  srtoDetails: {
    data: any[];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Inbound = {
  pto: {
    data: [],
    status: "idle",
  },
  ptoDetails: {
    data: [],
    status: "idle",
  },
  pur: {
    data: [],
    status: "idle",
  },
  whs: {
    data: [],
    status: "idle",
  },
  srto: {
    data: [],
    status: "idle",
  },
  srtoDetails: {
    data: [],
    status: "idle",
  },
};

const inboundReducer = createSlice({
  name: "inbound",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPTO.pending, (state, action) => {
        state.pto.status = "loading";
      })
      .addCase(getPTO.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");

          state.pto.data = [...state.pto.data, ...data.data];
        } else {
          console.log("normal fetch");
          state.pto.data = data.data;
        }
        state.pto.status = "success";
      })
      .addCase(getPTO.rejected, (state, action) => {
        state.pto.status = "failed";
      });
    builder
      .addCase(getPTODetails.pending, (state, action) => {
        state.ptoDetails.status = "loading";
      })
      .addCase(getPTODetails.fulfilled, (state, action) => {
        state.ptoDetails.status = "success";
        state.ptoDetails.data = action.payload.data;
      })
      .addCase(getPTODetails.rejected, (state, action) => {
        state.ptoDetails.status = "failed";
      });
    builder
      .addCase(getPUR.pending, (state, action) => {
        state.pur.status = "loading";
      })
      .addCase(getPUR.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.pur.data = [...state.pur.data, ...data.data];
        } else {
          console.log("normal fetch");
          state.pur.data = data.data;
        }
        state.pur.status = "success";
      })
      .addCase(getPUR.rejected, (state, action) => {
        state.pur.status = "failed";
      });

    builder
      .addCase(getSRTO.pending, (state, action) => {
        state.srto.status = "loading";
      })
      .addCase(getSRTO.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.srto.data = [...state.srto.data, ...data.data];
        } else {
          console.log("normal fetch");
          state.srto.data = data.data;
        }
        state.srto.status = "success";
      })
      .addCase(getSRTO.rejected, (state, action) => {
        state.srto.status = "failed";
      });
    builder
      .addCase(getWHS.pending, (state, action) => {
        state.whs.status = "loading";
      })
      .addCase(getWHS.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.whs.data = [...state.whs.data, ...data.data];
        } else {
          console.log("normal fetch");
          state.whs.data = data.data;
        }
        state.whs.status = "success";
      })
      .addCase(getWHS.rejected, (state, action) => {
        state.whs.status = "failed";
      });
    builder
      .addCase(getSRTODetails.pending, (state, action) => {
        state.srtoDetails.status = "loading";
      })
      .addCase(getSRTODetails.fulfilled, (state, action) => {
        state.srtoDetails.status = "success";
        state.srtoDetails.data = action.payload.data;
      })
      .addCase(getSRTODetails.rejected, (state, action) => {
        state.srtoDetails.status = "failed";
      });
  },
});

export const {} = inboundReducer.actions;

export default inboundReducer.reducer;
