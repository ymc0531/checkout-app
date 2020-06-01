import { combineReducers, Action } from "@reduxjs/toolkit";
import billingInfoReducer from './slice/billingInfoSlice';
import shippingInfoReducer from './slice/shippingInfoSlice';
import shippingMethodReducer from './slice/shippingMethodSlice';
import paymentMethodReducer from './slice/paymentMethodSlice';
import cartItemsReducer from './slice/cartItemsSlice';

const rootReducer = combineReducers({
  billingInfo: billingInfoReducer,
  shippingInfo: shippingInfoReducer,
  shippingMethod: shippingMethodReducer,
  paymentMethod: paymentMethodReducer,
  cartItems: cartItemsReducer
});

export default rootReducer;