import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    splashFinished: null,
    locationDetected: null,
}

export const initialLoadSlice = createSlice({
    name: "initial",
    initialState,
    reducers: {
        setSplashFinished: (state, action) => {
            state.origin = action.payload;
        },
        setLocationDetected: (state, action) => {
            state.destination = action.payload;
        },
    },
});

export const { setSplashFinished, setLocationDetected } = initialLoadSlice.actions;

// Selectors
export const selectSplashFinished = (state) => state.initial.splashFinished;
export const selectLocationDetected = (state) => state.initial.locationDetected;

export default initialLoadSlice.reducer;