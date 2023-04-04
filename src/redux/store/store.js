import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "../slice/filterSlice";
import { userReducer } from "../slice/userSlice";
import { getInitialState } from "../initialState/initialState";
import { cartReducer } from "../slice/cartSlice";

export const store = configureStore({
    reducer :  {
        filter: filterReducer,
        user: userReducer,
        cart: cartReducer
    },
    devTools: true,
    preloadedState: getInitialState()
});

store.subscribe(()=>{
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
});