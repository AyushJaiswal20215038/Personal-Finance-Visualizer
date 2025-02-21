import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getTransaction: (state,action) => {
      state.value = action.payload;
    },
    addTransaction: (state,action) => {
      state.value = [(action.payload),...state.value];
    },
    deleteTransaction: (state, action) => {
      state.value = [...state.value].toSpliced(action.payload,1);
    },
    updateTransaction: (state, action)=>{
        state.value = [...state.value.slice(0,action.payload.index),{...action.payload.data},...state.value.slice(action.payload.index+1)];
    },
  },
})

// Action creators are generated for each case reducer function
export const { getTransaction, addTransaction, deleteTransaction, updateTransaction } = counterSlice.actions

export default counterSlice.reducer 