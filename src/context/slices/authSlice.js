import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("x-auth-token") || null,
  botBaseUrl: localStorage.getItem("bot-base-url") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("x-auth-token", action.payload);
    },

    setBotBaseUrl: (state, action) => {
      state.botBaseUrl = action.payload;
      localStorage.setItem("bot-base-url", action.payload);
    },

    setAuthData: (state, action) => {
      const { token, botBaseUrl } = action.payload;
      state.token = token;
      state.botBaseUrl = botBaseUrl;
      localStorage.setItem("x-auth-token", token);
      localStorage.setItem("bot-base-url", botBaseUrl);
    },

    logout: (state) => {
      state.token = null;
      state.botBaseUrl = null;
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("bot-base-url");
    },

  },
});

export const { logout, setToken, setBotBaseUrl, setAuthData } = authSlice.actions;
export default authSlice.reducer;