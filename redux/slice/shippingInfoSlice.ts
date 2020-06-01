import { createSlice } from '@reduxjs/toolkit';

export const shippingInfo = createSlice({
  name: 'shippingInfo',
  initialState: {
    email: '',
    isSubscribe: true,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    address_2: '',
    city: '',
    country: 'Malaysia',
    region: '',
    postalCode: ''
  },
  reducers: {
    updateShippingInfo: (state, action) => {
      state[action.payload.infoType] = action.payload.value;
    }
  },
});

export const { 
  updateShippingInfo
} = shippingInfo.actions;

export default shippingInfo.reducer;


