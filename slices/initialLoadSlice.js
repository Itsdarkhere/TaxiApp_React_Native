import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    splashFinished: null,
    locationDetected: null,
    loggedIn: false,
}

export const initialLoadSlice = createSlice({
    name: "initial",
    initialState,
    reducers: {
        setSplashFinished: (state, action) => {
            state.splashFinished = action.payload;
        },
        setLocationDetected: (state, action) => {
            state.locationDetected = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        }
    },
});

export const { setSplashFinished, setLocationDetected, setLoggedIn } = initialLoadSlice.actions;

// Selectors
export const selectSplashFinished = (state) => state.initial.splashFinished;
export const selectLocationDetected = (state) => state.initial.locationDetected;
export const selectLoggedIn = (state) => state.initial.loggedIn;

export default initialLoadSlice.reducer;