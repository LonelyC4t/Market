import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

export const filterSlice = createSlice({
    name: "filter",
    initialState: initialState.filter,
    reducers: {
        changeSearch(state, action) {
            state.search = action.payload;
        }
    }

});

export  function getFilterSelector(state) {
    
    return  state.filter
};  

export const {changeSearch} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
