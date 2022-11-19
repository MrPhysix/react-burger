import { createSlice } from '@reduxjs/toolkit';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
  },
  reducers: {
    getIngredients(state, action) {
      state.ingredients = action.payload;
    },
  },
});

export const { getIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
