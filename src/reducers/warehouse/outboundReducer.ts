import {createSlice} from "@reduxjs/toolkit";
import {WTO_OUTBOUND} from "../../models/warehouse/outbound/wto-outbound";
import {OutboundItem} from "../../models/warehouse/outbound/wto-outbound-item";
import {WavepickDocument} from "../../models/warehouse/outbound/wavepick";
import {WavepickItem} from "../../models/warehouse/outbound/wavepickDetails";

import {
  getWTOOutboundPost,
  getWTOOutboundValid,
  getWTOOutboundDetails,
  getWPTODetails,
  getWPTOValid,
  getWPTOPost,
} from "../../store/actions/warehouse/warehouseActions";

interface Outbound {
  wto: {
    validation: {
      data: WTO_OUTBOUND[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: WTO_OUTBOUND[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
  wavepick: {
    validation: {
      data: WavepickDocument[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: WavepickDocument[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
  singlepick: {
    validation: {
      data: any[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    forPosting: {
      data: any[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
  };
  wtoOutboundDetails: {
    data: OutboundItem[];
    status: "idle" | "loading" | "success" | "failed";
  };
  wavepickDetails: {
    data: WavepickItem[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Outbound = {
  wto: {
    forPosting: {
      data: [],
      status: "idle",
    },
    validation: {
      data: [],
      status: "idle",
    },
  },
  wtoOutboundDetails: {
    data: [],
    status: "idle",
  },

  singlepick: {
    forPosting: {
      data: [],
      status: "idle",
    },
    validation: {
      data: [],
      status: "idle",
    },
  },
  wavepick: {
    forPosting: {
      data: [],
      status: "idle",
    },
    validation: {
      data: [],
      status: "idle",
    },
  },
  wavepickDetails: {
    data: [],
    status: "idle",
  },
};

const outboundReducer = createSlice({
  name: "outbound",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWTOOutboundValid.pending, (state, action) => {
        state.wto.validation.status = "loading";
      })
      .addCase(getWTOOutboundValid.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.wto.validation.data = [
            ...state.wto.validation.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.wto.validation.data = data.data;
        }
        state.wto.validation.status = "success";
      })
      .addCase(getWTOOutboundValid.rejected, (state, action) => {
        state.wto.validation.status = "failed";
      });
    builder
      .addCase(getWTOOutboundPost.pending, (state, action) => {
        state.wto.forPosting.status = "loading";
      })
      .addCase(getWTOOutboundPost.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.wto.forPosting.data = [
            ...state.wto.forPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.wto.forPosting.data = data.data;
        }
        state.wto.forPosting.status = "success";
      })
      .addCase(getWTOOutboundPost.rejected, (state, action) => {
        state.wto.forPosting.status = "failed";
      });
    builder
      .addCase(getWTOOutboundDetails.pending, (state, action) => {
        state.wtoOutboundDetails.status = "loading";
      })
      .addCase(getWTOOutboundDetails.fulfilled, (state, action) => {
        state.wtoOutboundDetails.status = "success";
        state.wtoOutboundDetails.data = action.payload.data;
      })
      .addCase(getWTOOutboundDetails.rejected, (state, action) => {
        state.wtoOutboundDetails.status = "failed";
      });

    builder
      .addCase(getWPTOValid.pending, (state, action) => {
        state.wavepick.validation.status = "loading";
      })
      .addCase(getWPTOValid.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.wavepick.validation.data = [
            ...state.wavepick.validation.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.wavepick.validation.data = data.data;
        }
        state.wavepick.validation.status = "success";
      })
      .addCase(getWPTOValid.rejected, (state, action) => {
        state.wavepick.validation.status = "failed";
      });
    builder
      .addCase(getWPTOPost.pending, (state, action) => {
        state.wavepick.forPosting.status = "loading";
      })
      .addCase(getWPTOPost.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.wavepick.forPosting.data = [
            ...state.wavepick.forPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");

          state.wavepick.forPosting.data = data.data;
        }
        state.wavepick.forPosting.status = "success";
      })
      .addCase(getWPTOPost.rejected, (state, action) => {
        state.wavepick.forPosting.status = "failed";
      });
    builder
      .addCase(getWPTODetails.pending, (state, action) => {
        state.wavepickDetails.status = "loading";
      })
      .addCase(getWPTODetails.fulfilled, (state, action) => {
        state.wavepickDetails.status = "success";
        state.wavepickDetails.data = action.payload.data;
      })
      .addCase(getWPTODetails.rejected, (state, action) => {
        state.wavepickDetails.status = "failed";
      });
  },
});

export const {} = outboundReducer.actions;

export default outboundReducer.reducer;
