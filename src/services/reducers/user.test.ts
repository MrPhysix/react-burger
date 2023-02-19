import reducer, { setUserSlice, resetUserSlice } from './user';
import { TUser } from '../../types';

const name: string = 'user';

const initialState: TUser = {
  name: '',
  email: '',
  success: false,
};

test(`[${name}]: should return the initial ${name} state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should handle a ${name} info`, () => {
  expect(reducer(initialState, setUserSlice({
    success: true,
    user: {
      name: 'Test',
      email: 'test@test.test',
      success: true,
    },
  }))).toEqual(
    {
      name: 'Test',
      email: 'test@test.test',
      success: true,
    },
  );
});

test(`[${name}]: should handle a ${name} info to initial state`, () => {
  const previousState: TUser = {
    name: 'Test',
    email: 'test@test.test',
    success: true,
  };

  expect(reducer(previousState, resetUserSlice())).toEqual(
    initialState,
  );
});
