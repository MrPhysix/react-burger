import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  constructorIngredients: [],
  bun: null,
};

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    getConstructorIngredients(state, action) {
      state.constructorIngredients = action.payload;
    },
    addConstructorIngredient(state, action) {
      state.constructorIngredients.push(action.payload);
    },
    addConstructorBun(state, action) {
      state.bun = (action.payload);
    },
    swapConstructorIngredients(state, action) {
      const [fromIndex, toIndex] = action.payload;

      const ingredients = [...state.constructorIngredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);

      state.constructorIngredients = ingredients;
    },
    resetConstructorIngredients: () => initialState,
  },
});

export const {
  getConstructorIngredients,
  addConstructorIngredient,
  addConstructorBun,
  swapConstructorIngredients,
  resetConstructorIngredients,
} = constructorIngredientsSlice.actions;
export default constructorIngredientsSlice.reducer;
