import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { HttpStatusCode } from 'axios';


export const getUser = createAsyncThunk("user", async (userId) => {
    try {
      const response = await Axios.get(`http://localhost:3001/user?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  })


export const user = createSlice({
    name: "User",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state, action) => {
            state.responseData = action.payload;
            state.errors = null;
        })
    }
})

export default user.reducer