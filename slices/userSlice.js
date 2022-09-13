import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = userSlice.actions;

// Selectors
export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;