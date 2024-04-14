import { configureStore } from "@reduxjs/toolkit";
import register from '../actions/reg';
import user from '../actions/credentials'
import login from '../actions/login';
import AddTask from '../actions/addTask';
import EditTask from '../actions/editTask';
import  StickWall  from "../actions/stickyWall";

const store = configureStore({
    reducer: {
        Register: register,
        Login: login,
        User: user,
        addTask: AddTask,
        editTask: EditTask,
        stickyWall: StickWall
    }
})

export default store
