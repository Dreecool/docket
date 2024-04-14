import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { HttpStatusCode } from 'axios';
import Cookies from "js-cookie";


export const setLog = createAsyncThunk("login", async (data) => {
    try {
        const response = await Axios.post("http://localhost:3001/login", data);
        const token = response.data.tok
        const ID = response.data.ID
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'None' });
        Cookies.set('userId', ID, { expires: 1, secure: true, sameSite: 'None' });
        return response.data
    } catch(error) {
        throw error.response.data
    }
})


const login = createSlice({
    name: "Login",
    initialState: {
        email: '',
        password: '',
        errors: null,
        loading: null, 
        modalIsOpen: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload;
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
        .addCase(setLog.pending, (state, action) => {
            state.errors = null; 
            state.loading = true;
            state.modalIsOpen = true;
        })
        .addCase(setLog.fulfilled, (state, action) => {
            state.data = action.payload;
            state.errors = null;
            window.location.reload()
        })
        .addCase(setLog.rejected, (state, action) => {
            state.errors = HttpStatusCode.BadRequest
        })
    }
})

export const {setEmail, setPassword, setLoading, setModalIsOpen} = login.actions;
export default login.reducer
