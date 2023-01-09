import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null,
  isOpen: false,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientDetails(state, action) {
      state.item = action.payload;
    },
    resetIngredientDetails: () => initialState,
    openIngredientDetails(state) {
      state.isOpen = true;
    },
  },
});

export const {
  setIngredientDetails,
  resetIngredientDetails,
  openIngredientDetails,
} = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
