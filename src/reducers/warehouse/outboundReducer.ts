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
  getPKValidate,
  getINVPosting,
  getSTGValidate,
  getSPLPosting,
  getSTGValidateDetails,
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
    pkValidate: {
      data: any[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    invPosting: {
      data: any[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    stgValidate: {
      data: any[] | [];
      status: "idle" | "loading" | "success" | "failed";
    };
    splPosting: {
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
  stgDetails: {
    data: WavepickItem[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  singlepickDetails: {
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
    pkValidate: {
      data: [],
      status: "idle",
    },
    invPosting: {
      data: [],
      status: "idle",
    },
    stgValidate: {
      data: [],
      status: "idle",
    },
    splPosting: {
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
  stgDetails: {
    data: [],
    status: "idle",
  },
  singlepickDetails: {
    data: [],
    status: "idle",
  },
};

const outboundReducer = createSlice({
  name: "outbound",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // WTO
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
    // WAVEPICK
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
        state.singlepickDetails.status = "loading";
      })
      .addCase(getWPTODetails.fulfilled, (state, action) => {
        state.wavepickDetails.status = "success";
        state.singlepickDetails.status = "success";

        state.wavepickDetails.data = action.payload.data;
        state.singlepickDetails.data = action.payload.data;
      })
      .addCase(getWPTODetails.rejected, (state, action) => {
        state.wavepickDetails.status = "failed";
        state.singlepickDetails.status = "failed";
      });
    //SINGLEPICK
    builder
      .addCase(getPKValidate.pending, (state, action) => {
        state.singlepick.pkValidate.status = "loading";
      })
      .addCase(getPKValidate.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.singlepick.pkValidate.data = [
            ...state.singlepick.pkValidate.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.singlepick.pkValidate.data = data.data;
        }
        state.singlepick.pkValidate.status = "success";
      })
      .addCase(getPKValidate.rejected, (state, action) => {
        state.singlepick.pkValidate.status = "failed";
      });

    builder
      .addCase(getINVPosting.pending, (state, action) => {
        state.singlepick.invPosting.status = "loading";
      })
      .addCase(getINVPosting.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.singlepick.invPosting.data = [
            ...state.singlepick.invPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.singlepick.invPosting.data = data.data;
        }
        state.singlepick.invPosting.status = "success";
      })
      .addCase(getINVPosting.rejected, (state, action) => {
        state.singlepick.invPosting.status = "failed";
      });

    builder
      .addCase(getSTGValidate.pending, (state, action) => {
        state.singlepick.stgValidate.status = "loading";
      })
      .addCase(getSTGValidate.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.singlepick.stgValidate.data = [
            ...state.singlepick.stgValidate.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.singlepick.stgValidate.data = data.data;
        }
        state.singlepick.stgValidate.status = "success";
      })
      .addCase(getSTGValidate.rejected, (state, action) => {
        state.singlepick.stgValidate.status = "failed";
      });

    builder
      .addCase(getSPLPosting.pending, (state, action) => {
        state.singlepick.splPosting.status = "loading";
      })
      .addCase(getSPLPosting.fulfilled, (state, action) => {
        const {data, paginating} = action.payload;
        if (paginating) {
          console.log("paginating");
          state.singlepick.splPosting.data = [
            ...state.singlepick.splPosting.data,
            ...data.data,
          ];
        } else {
          console.log("normal fetch");
          state.singlepick.splPosting.data = data.data;
        }
        state.singlepick.splPosting.status = "success";
      })
      .addCase(getSPLPosting.rejected, (state, action) => {
        state.singlepick.splPosting.status = "failed";
      });

    builder
      .addCase(getSTGValidateDetails.pending, (state, action) => {
        state.singlepickDetails.status = "loading";
      })
      .addCase(getSTGValidateDetails.fulfilled, (state, action) => {
        state.singlepickDetails.status = "success";
        state.singlepickDetails.data = action.payload.data;
      })
      .addCase(getSTGValidateDetails.rejected, (state, action) => {
        state.singlepickDetails.status = "failed";
      });
  },
});

export const {} = outboundReducer.actions;

export default outboundReducer.reducer;
