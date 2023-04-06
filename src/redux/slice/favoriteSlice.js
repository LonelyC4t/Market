import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: initialState.favorite,
    reducers: {
        addFavorite(state, action) {    
            const product = state.find((el => el.id === action.payload));
            if(product) {
                return state
            } else {
                state.push({
                    id: action.payload,
                })
                
            }
            
        },

        delFavorite(state, action) {
            return state.filter((el) => el.id !== action.payload)
        },
    }
});

export const { addFavorite, delFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;