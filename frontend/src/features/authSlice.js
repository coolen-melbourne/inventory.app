import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  Authuser: JSON.parse(localStorage.getItem("user")) || null, 
  isUserSignup: false,
  staffuser: null,
  manageruser: null,
  adminuser: null,
  isUserLogin: false,
  token: localStorage.getItem("token") || null,
  isupdateProfile: false,
};

// ====== Signup ======
export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.savedUser)); 
      localStorage.setItem("token", response.data.savedUser.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// ====== Login ======
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      localStorage.setItem("token", response.data.user.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ====== Logout ======
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ====== Update Profile ======
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (base64Image, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        return rejectWithValue('User not authenticated. Please log in again.');
      }

      const response = await axiosInstance.put(
        'auth/updateProfile',
        { ProfilePic: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = response.data;
      if (updatedData && updatedData.updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedData.updatedUser));
        return updatedData.updatedUser;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// ====== Get Users by Role ======
export const staffUser = createAsyncThunk('auth/staffuser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/staffuser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get staff user');
  }
});

export const managerUser = createAsyncThunk('auth/manageruser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/manageruser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get manager user');
  }
});

export const adminUser = createAsyncThunk('auth/adminuser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/adminuser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get admin user');
  }
});

// ====== Remove User ======
export const removeusers = createAsyncThunk("auth/removeuser", async (UserId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`auth/removeuser/${UserId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

// ====== Slice ======
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => { state.isUserSignup = true; })
      .addCase(signup.fulfilled, (state, action) => { 
        state.isUserSignup = false; 
        state.Authuser = action.payload.savedUser; 
        state.token = action.payload.savedUser.token; 
      })
      .addCase(signup.rejected, (state) => { state.isUserSignup = false; })

      // Login
      .addCase(login.pending, (state) => { state.isUserLogin = true; })
      .addCase(login.fulfilled, (state, action) => { 
        state.isUserLogin = false; 
        state.Authuser = action.payload.user; 
        state.token = action.payload.user.token; 
      })
      .addCase(login.rejected, (state) => { state.isUserLogin = false; })

      // Logout
      .addCase(logout.fulfilled, (state) => { 
        state.Authuser = null; 
        state.token = null; 
        toast.success("Successfully logged out!"); 
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => { state.isupdateProfile = true; })
      .addCase(updateProfile.fulfilled, (state, action) => { 
        state.isupdateProfile = false; 
        state.Authuser = action.payload; 
      })
      .addCase(updateProfile.rejected, (state) => { state.isupdateProfile = false; })

      // Staff user
      .addCase(staffUser.fulfilled, (state, action) => { state.staffuser = action.payload; })
      .addCase(staffUser.rejected, (state, action) => {})

      // Manager user
      .addCase(managerUser.fulfilled, (state, action) => { state.manageruser = action.payload; })
      .addCase(managerUser.rejected, (state, action) => {})

      // Admin user
      .addCase(adminUser.fulfilled, (state, action) => { state.adminuser = action.payload; })
      .addCase(adminUser.rejected, (state, action) => {})

      // Remove user
      .addCase(removeusers.fulfilled, (state, action) => {})
      .addCase(removeusers.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;