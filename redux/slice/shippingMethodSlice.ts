import { createSlice } from '@reduxjs/toolkit';

export const shippingMethod = createSlice({
  name: 'billingInfo',
  initialState: {
    shippingType: 'standard',
    shippingFee: {
      standard: 10,
      express: 18
    }
  },
  reducers: {
    updateShippingMethod: (state, action) => {
      state.shippingType = action.payload;
    }
  },
});

export const { 
  updateShippingMethod
} = shippingMethod.actions;

export default shippingMethod.reducer;


