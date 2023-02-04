import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setModalInfo(state, action) {
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
