import { createSlice } from '@reduxjs/toolkit';

export const billingInfo = createSlice({
  name: 'billingInfo',
  initialState: {
    isSame: true,
    firstName: '',
    lastName: '',
    address: '',
    address_2: '',
    city: '',
    country: 'Malaysia',
    region: '',
    postalCode: ''
  },
  reducers: {
    updateBillingInfo: (state, action) => {
      state[action.payload.infoType] = action.payload.value;
    }
  },
});

export const { 
  updateBillingInfo
} = billingInfo.actions;

export default billingInfo.reducer;


