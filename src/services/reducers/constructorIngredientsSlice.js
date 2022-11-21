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
    swapConstructorIngredients(state, action) {
      const [fromIndex, toIndex] = action.payload;

      const ingredients = [...state.constructorIngredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);

      state.constructorIngredients = ingredients;
    },
  },
});

export const {
  getConstructorIngredients,
  addConstructorIngredient,
  swapConstructorIngredients,
} = constructorIngredientsSlice.actions;
export default constructorIngredientsSlice.reducer;
