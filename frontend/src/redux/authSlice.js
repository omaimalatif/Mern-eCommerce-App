import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // Adjust path to your interceptor file

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Points directly to: VITE_API_URL + "/api/users/login"
      const response = await API.post("/users/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.User));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Points directly to: VITE_API_URL + "/api/users/register"
      const response = await API.post("/users/register", userData);
      // Auto-authenticate immediately if backend sends down credentials inside registration response
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.User));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN SYSTEM CASES
      .addCase(loginUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.User;
      })
      .addCase(loginUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })
      
      // REGISTRATION SYSTEM CASES
      .addCase(registerUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // If your backend maps the profile token upon user initialization, instantly log them in
        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.User;
        }
      })
      .addCase(registerUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;