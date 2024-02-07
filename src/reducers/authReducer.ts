import {createSlice} from "@reduxjs/toolkit";

interface AuthUser {
  user: {
    status: "logged-out" | "logged-in";
  };
  server: {
    protocol: string;
    ipAddress: string;
    port: number;
  };
}

const initialState: AuthUser = {
  user: {status: "logged-out"},
  server: {ipAddress: "192.168.100.4", port: 8080, protocol: "http"},
};

const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    onLogin: (state) => {
      state.user.status = "logged-in";
    },
    onLogout: (state) => {
      state.user.status = "logged-out";
    },
    handleUpdateProtocol: (state, action) => {
      console.log(action.payload);

      state.server = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {onLogin, onLogout, handleUpdateProtocol} = authUser.actions;

export default authUser.reducer;
