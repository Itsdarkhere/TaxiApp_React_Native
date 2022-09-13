import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice.js";
import initialLoadSlice from "./slices/initialLoadSlice.js";
import userSlice from "./slices/userSlice.js";

export const store = configureStore({
    reducer: {
        nav: navReducer,
        initialLoad: initialLoadSlice,
        user: userSlice,
    }
})