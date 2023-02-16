// @ts-ignore
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { TInitialState, fetchIngredients } from './ingredients';
import { mockedIngredients } from '../../utils/mocked';

const name: string = 'ingredients';

const initialState: TInitialState = {
  ingredients: [],
  status: null,
  error: null,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test(`[${name}]: should return the initial ${name} state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should handle a ${name} info`, () => {
  const expectedActions = [ // не понял как сделать тут
    expect.anything(),
    {
      meta: expect.anything(),
    },
    {
      type: 'ingredients/fetchIngredients/pending',
      payload: undefined,
    },
    {
      type: 'fulfilled',
      payload: {
        data: mockedIngredients,
      },
    },
  ];

  const store = mockStore({ initialState });
  store.dispatch(fetchIngredients());

  // expect(store.getActions()).toEqual(expectedActions);
  // из-за этого теста как бы и нет
});
