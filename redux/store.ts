import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;

/*
usage:
import { useSelector, useDispatch } from "react-redux";
const dispatch = useDispatch();
const shopList = useSelector((state: RootState) => state.shopList.items); 
*/