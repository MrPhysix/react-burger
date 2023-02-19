import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_INGREDIENTS_URL } from '../../utils/const';
import checkResult from '../../utils/api/checkResult';
import { TIngredient } from '../../types';

export type TInitialState = {
  ingredients: Array<TIngredient>,
  status: string | null,
  error: string | null,
};

const initialState: TInitialState = {
  ingredients: [],
  status: null,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const res = await fetch(API_INGREDIENTS_URL);
    return checkResult(res);
  },
);

function isRejectedAction(action: PayloadAction<any>) {
  return action.type?.endsWith('rejected');
}

const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients(state, action: PayloadAction<any>) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'request';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'success';
        state.ingredients = action.payload.data;
        state.error = null;
      })
      .addMatcher(
        isRejectedAction,
        (state) => {
          state.status = 'error';
          state.error = 'some error'; // не знаю как доставать ерроры
        },
      );
    // and provide a default case if no other handlers matched
    // .addDefaultCase((state) => {
    //   state = initialState;
    // });
  },
});

export const { getIngredients } = ingredients.actions;
export default ingredients.reducer;
