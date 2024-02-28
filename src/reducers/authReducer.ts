import {createSlice} from "@reduxjs/toolkit";

interface UserDetails {
  token: string;
  usrcde: string;
  usrlvl: string;
  usrname: string;
}

interface AuthUser {
  user: {
    status: "logged-out" | "logged-in";
    userDetails: UserDetails | null;
  };
  server: {
    protocol: string;
    ipAddress: string;
    port: number;
  };
}

const initialState: AuthUser = {
  user: {status: "logged-out", userDetails: null},
  server: {ipAddress: "192.168.100.4", port: 5901, protocol: "http"},
};

const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.user.status = "logged-in";
      state.user.userDetails = action.payload;
    },
    onLogout: (state) => {
      state.user.status = "logged-out";
      state.user.userDetails = null;
    },
    handleUpdateProtocol: (state, action) => {
      state.server = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {onLogin, onLogout, handleUpdateProtocol} = authUser.actions;

export default authUser.reducer;
