import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { HttpStatusCode } from "axios"

export const setReg = createAsyncThunk("reg", async (data) => {
    try {
        const response = await Axios.post("http://localhost:3001/register", data)
        return HttpStatusCode.Accepted
    } catch(error) {
        throw error.response.data
    }
})


const register = createSlice({
    name: "Register",
    initialState: {
        full_name: '',
        email_address: '',
        password: '',
        repeatPassword: '',
        errors: null,
        loading: null, 
        modalIsOpen: null 
    },
    reducers: {
        setFullName: (state, action) => {
            state.full_name = action.payload;
        },
        setEmailAddress: (state, action) => {
            state.email_address = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRepeatPassword: (state, action) => {
            state.repeatPassword = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setModalIsOpen: (state, action) => {
            state.modalIsOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(setReg.pending, (state, action) => {
            state.errors = null; 
            state.responseData = null;
            state.loading = true;
            state.modalIsOpen = true;
        })
        .addCase(setReg.fulfilled, (state, action) => {
            state.full_name = ""
            state.email_address = ""
            state.password = ""
            state.repeatPassword = ""
            state.responseData = action.payload
        })
        .addCase(setReg.rejected, (state, action) => {
            state.errors = HttpStatusCode.BadRequest
        })
    }
})

export const {setFullName, setEmailAddress, setPassword, setRepeatPassword, setLoading, setModalIsOpen} = register.actions;
export default register.reducer
