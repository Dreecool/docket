import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';

export const editTask = createAsyncThunk("editTask", async(data) => {
    try {
        const response = await Axios.put(`https://docket-84ya.vercel.app/updateTask`, data);
        return response.data;
    } catch(error) {
        throw error.response.data;
    }
})

export const deleteTask = createAsyncThunk("deleteTask", async (taskId) => {
    try {
        const response = await Axios.delete(`https://docket-84ya.vercel.app/deleteTask`, {
            params: {
                taskId: taskId
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})

const EditTask = createSlice({
    name: "editTask",
    initialState: {
        task: '',
        description: '',
        date: '',
        userID: ''
    },
    reducers: {
        setEditTask: (state, action) => {
            state.task = action.payload;
        },
        setEditDescription: (state, action) => {
            state.description = action.payload;
        },
        setEditDate: (state, action) => {
            state.date = action.payload;
        },
        setUserID: (state, action) => {
            state.userID = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(editTask.fulfilled, (state, action) => {
            state.responseData = action.payload;
            state.errors = null;
        })
    }
});

export const { setEditTask, setEditDescription, setEditDate, setUserID } = EditTask.actions;
export default EditTask.reducer;
