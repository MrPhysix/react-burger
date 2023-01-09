import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_INGREDIENTS_URL } from '../../utils/const';
import checkResult from '../../utils/api/checkResult';

const initialState = {
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

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients(state, action) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'request';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.ingredients = action.payload.data;
        state.error = null;
      })
      .addMatcher(
        isRejectedAction,
        (state) => {
          state.status = 'error';
          state.error = null;
        },
      );
    // and provide a default case if no other handlers matched
    // .addDefaultCase((state) => {
    //   state = initialState;
    // });
  },
});

export const { getIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
