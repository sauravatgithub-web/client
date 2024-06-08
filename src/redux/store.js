import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from './reducers/auth'
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

const store = configureStore({
    reducer: {
        // name for reducer: reducer function          ----- format
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware]
    // api.middleware is from the redux RTK query by default
})

export default store;

/*
    WHY USE MIDDLEWARES

    API Calls: To handle API requests, responses, and errors seamlessly within your Redux actions.
    LOGGING: To log actions and state changes for debugging purposes.
    ANALYTICS: To send data to analytics services whenever certain actions are dispatched.
*/