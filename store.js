import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice.js";
import initialLoadSlice from "./slices/initialLoadSlice.js";

export const store = configureStore({
    reducer: {
        nav: navReducer,
        initialLoad: initialLoadSlice,
    }
})