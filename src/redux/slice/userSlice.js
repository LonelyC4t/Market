import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

export const userSlice = createSlice({
    name: "user",
    initialState: initialState.user,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        removeUser() {
            localStorage.clear()
            return initialState.user;
        }
    }   

});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;