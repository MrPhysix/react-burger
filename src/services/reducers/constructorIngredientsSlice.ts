import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  constructorIngredients: [],
  bun: null,
};

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    getConstructorIngredients(state, actions: PayloadAction<any>) {
      state.constructorIngredients = actions.payload;
    },
    addConstructorIngredient(state, actions: PayloadAction<any>) {
      state.constructorIngredients.push(actions.payload as never);
    },
    addConstructorBun(state, actions: PayloadAction<any>) {
      state.bun = (actions.payload);
    },
    swapConstructorIngredients(state, actions: PayloadAction<any>) {
      const [fromIndex, toIndex] = actions.payload;

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
