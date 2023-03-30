import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "../slice/filterSlice";
import {combineReducers} from "redux";
import { userReducer } from "../slice/userSlice";
import { getInitialState } from "../initialState/initialState";
import { cartReducer } from "../slice/cartSlice";


export const mainReducer = combineReducers({
    filter: filterReducer,
    user: userReducer,
    cart: cartReducer
});

export const store = configureStore({
    reducer : mainReducer,
    devTools: true,
    preloadedState: getInitialState()
});

store.subscribe(()=>{
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
});