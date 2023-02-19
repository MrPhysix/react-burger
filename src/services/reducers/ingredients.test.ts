import reducer, { TInitialState, fetchIngredients } from './ingredients';
import { mockedIngredients } from '../../utils/mocked';

const name: string = 'ingredients';

const initialState: TInitialState = {
  ingredients: [],
  status: null,
  error: null,
};

test(`[${name}]: should return the initial ${name} state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should set status 'request' when is pending`, () => {
  const action = { type: fetchIngredients.pending.type };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ingredients: [],
    status: 'request',
    error: null,
  });
});

test(`[${name}]: should handle ${name} array and status 'success' when is fulfilled`, () => {
  const action = {
    type: fetchIngredients.fulfilled.type,
    payload: {
      data: mockedIngredients,
    },
  };

  const state = reducer(initialState, action);

  expect(state).toEqual({
    ingredients: mockedIngredients,
    status: 'success',
    error: null,
  });
});

test(`[${name}]: should set status 'error' when is pending`, () => {
  const action = { type: 'ingredients/fetchIngredients/rejected' };
  const state = reducer(initialState, action);

  expect(state).toEqual({
    ingredients: [],
    status: 'error',
    error: 'some error', // не знаю как доставать ерроры
  });
});
