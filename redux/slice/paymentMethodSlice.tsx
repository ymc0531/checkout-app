import { createSlice } from '@reduxjs/toolkit';

export const paymentMethod = createSlice({
  name: 'paymentMethod',
  initialState: {
    discountCode: '',
    paymentType: 'creditCard'
  },
  reducers: {
    updateDiscountCode: (state, action) => {
      state.discountCode = action.payload;
    },
    updatePaymentMethod: (state, action) => {
      state.paymentType = action.payload;
    }
  },
});

export const { 
  updateDiscountCode,
  updatePaymentMethod
} = paymentMethod.actions;

export default paymentMethod.reducer;


