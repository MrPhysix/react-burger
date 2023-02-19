import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredients } from '../../types';

const initialState: TConstructorIngredients = {
  constructorIngredients: [],
  bun: undefined,
};

const constructorIngredients = createSlice({
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
} = constructorIngredients.actions;
export default constructorIngredients.reducer;
