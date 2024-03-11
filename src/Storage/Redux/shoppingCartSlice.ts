import {createSlice} from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

const initialState :shoppingCartModel= {
    CartItems: [],
    // search: "",
  };
  
  export const shoppingCartSlice = createSlice({
    name: "CartItems",
    initialState: initialState,
    reducers: {
      setShoppingCart: (state, action) => {
        state.CartItems = action.payload;
      },
      updateQuantity: (state, action) => {
        //payload - cart item that needs to be updated, newquantity
        state.CartItems = state.CartItems?.map((item) => {
          if (item.Id === action.payload.cartItem.Id) {
            item.Quantity = action.payload.Quantity;
          }
          return item;
        });
        
      },
      removeFromCart: (state, action) => {
        //payload - cart item that needs to be updated, newquantity
        state.CartItems = state.CartItems?.filter((item) => {
          if (item.Id === action.payload.cartItem.Id) {
            return null;
          }
          return item;
        });
      },
    },
    //   setSearchItem: (state, action) => {
    //     state.search = action.payload;
    //   },
    
  });
  
  export const { setShoppingCart ,updateQuantity,removeFromCart} = shoppingCartSlice.actions;
  export const shoppingCartReducer = shoppingCartSlice.reducer;