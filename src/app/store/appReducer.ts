import { combineReducers } from "@reduxjs/toolkit";
import { cardsSlice } from "../../shared/store/cardsSlice";

export const appReducer = combineReducers({
  [cardsSlice.reducerPath]: cardsSlice.reducer,
});
