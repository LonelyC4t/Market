import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState.cart,
    reducers: {
        addItem(state, action) {
            
            const productItem = state.find(el => el.id === action.payload);
            
            if(productItem) {

                productItem.count++
                return state
            }
            state.push({
                id: action.payload,
                count: 1,
                isCheked: false
            })
            
        },

        removeItem(state, action) {
           return state.filter((el)=> el.id !== action.payload);
           
        },

        removeAllItem(){
            return initialState.cart
        },

        incrementCount(state, action) {
            let productItem = state.find(el => el.id === action.payload);
            productItem.count++
            return state
        },

        deсrementCount(state, action){
            let productItem = state.find(el => el.id === action.payload);
            
            if(productItem.count === 1) {
                return state.filter((el) =>  el.id !== action.payload )
                 
            }
            productItem.count--                   
        },
        changeChek(state, action) {
            let productItem = state.find(el => el.id === action.payload._id);
          
            if(productItem) {
                productItem.isCheked = action.payload.isCheked
                
                return state
            }
            return state
        }
    }

});
 

export const { addItem, removeItem, removeAllItem, incrementCount, deсrementCount, changeChek } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;