import { createSlice } from '@reduxjs/toolkit';

export const cartItems = createSlice({
  name: 'cartItems',
  initialState: {
    items: {}
  },
  reducers: {
    updateCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { 
  updateCartItems
} = cartItems.actions;

export default cartItems.reducer;


