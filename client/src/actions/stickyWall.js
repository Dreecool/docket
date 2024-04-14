import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import Axios from 'axios'

export const addStickWall = createAsyncThunk("stick wall", async(data) => {
    try {
        const response = await Axios.post(
            "http://localhost:3001/stickyWall", data
        )
        return response.data
    } catch(error) {
        throw error.response.data
    }
})


export const getStickWall = createAsyncThunk("get data stick wall", async(id) => {
    
    try {
        const response = await Axios.get("http://localhost:3001/stickyWall/getStickyWall", {
            params: {
                userID: id
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data
    }


})

export const deleteStickWall = createAsyncThunk("delete stick wall", async(id) => {
    
    try {
        const response = await Axios.delete("http://localhost:3001/stickyWall/deleteStickWall", {
            params: {
                userID: id
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data
    }


})



export const StickWall = createSlice({
    name: "stickyWall",
    initialState: {
        title: '',
        description: '',
        backgroundColor: 'white'
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addStickWall.fulfilled, (state, action) => {
            state.title = ''
            state.description = ''
            state.backgroundColor = 'white'
        })
        .addCase(getStickWall.fulfilled, (state, action) => {
            state.responseData = action.payload
        })
    }
})

export const {setTitle, setDescription, setBackgroundColor} = StickWall.actions;
export default StickWall.reducer;