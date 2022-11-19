import { createSlice } from '@reduxjs/toolkit';

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState: {
    constructorIngredients: [],
  },
  reducers: {
    getConstructorIngredients(state, action) {
      state.constructorIngredients = action.payload;
    },
    addConstructorIngredient(state, action) {
      state.constructorIngredients.push(action.payload);
    },
  },
});

export const {
  getConstructorIngredients,
  addConstructorIngredient,
} = constructorIngredientsSlice.actions;
export default constructorIngredientsSlice.reducer;
