import { createSlice } from "@reduxjs/toolkit";

export type BalanceState = {
  value: number;
};

const initialState: BalanceState = { value: 0 };

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = balanceSlice.actions;
export default balanceSlice.reducer;
