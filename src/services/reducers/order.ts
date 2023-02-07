import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../types';

const initialState = {
  name: '',
  order: {
    number: null,
  },
  success: false,
  isOpen: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<any>) {
      state.name = action.payload.name;
      state.order.number = action.payload.order.number;
      state.success = action.payload.success;
    },
    resetOrder: () => initialState,
    openOrder: (state) => {
      state.isOpen = true;
    },
  },
});

export const { setOrder, resetOrder, openOrder } = orderSlice.actions;
export default orderSlice.reducer;
