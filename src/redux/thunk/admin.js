import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { server } from "../../components/constants/config";

/*
    createAsyncThunk is used for managing async operations in redux.
    automatically generates 3 action types: "pending", "fulfilled", "rejected".
    automatic payload generation based on result of async operation
    standard way to handle errors
*/

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`${server}/api/v1/admin/verify`, {secretKey}, config);
        return data.message
    }
    catch (error) {
        throw error.response.data.message;
    }
})

const getAdmin = createAsyncThunk("admin/getAdmin", async() => {
    try {
        const config = {
            withCredentials: true,
        }
        const { data } = await axios.get(`${server}/api/v1/admin`, config);
        return data.admin
    }
    catch (error) {
        throw error.response.data.message;
    }
})

const adminLogout = createAsyncThunk("admin/logout", async() => {
    try {
        const config = {
            withCredentials: true,
        }
        const { data } = await axios.get(`${server}/api/v1/admin/logout`, config);
        return data.message
    }
    catch (error) {
        throw error.response.data.message;
    }
})

export { adminLogin, getAdmin, adminLogout }