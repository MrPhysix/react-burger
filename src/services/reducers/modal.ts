import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TModal } from '../../types';

const initialState: TModal = {
  item: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setModalInfo(state: any, action: PayloadAction<TIngredient>) {
      state.item = action.payload;
    },
    resetModalInfo: () => initialState,
    openModal(state) {
      state.isOpen = true;
    },
  },
});

export const {
  setModalInfo,
  resetModalInfo,
  openModal,
} = modalSlice.actions;

export default modalSlice.reducer;
