import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
})