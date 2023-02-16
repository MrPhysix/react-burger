import reducer, { setOrder, resetOrder, openOrder } from './order';
import {
  TCurrentOrderState,
} from '../../types';
import { mockedIngredients } from '../../utils/mocked';

const name: string = 'order';

const initialState: TCurrentOrderState = {
  name: '',
  order: {
    number: null,
  },
  success: false,
  isOpen: false,
};

test(`[${name}]: should return the initial state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should handle a current ${name}`, () => {
  expect(reducer(initialState, setOrder({
    name: 'Бессмертный тестовый флюоресцентный бургер',
    order: {
      createdAt: '2023-02-16T14:28:20.077Z',
      updatedAt: '2023-02-16T14:28:20.077Z',
      ingredients: mockedIngredients,
      name: 'Бессмертный тестовый флюоресцентный бургер',
      number: 40936,
      owner: {
        createdAt: '2023-01-03T12:12:13.044Z',
        email: 'pashashalaev777@gmail.com',
        name: 'Pasha',
        updatedAt: '2023-02-16T14:18:05.408Z',
      },
      price: 4301,
      status: 'done',
      _id: '63ee3d84936b17001be5e5ff',
    },
    success: true,
  }))).toEqual(
    {
      name: 'Бессмертный тестовый флюоресцентный бургер',
      order: {
        number: 40936,
      },
      success: true,
      isOpen: false,
    },
  );
});

test(`[${name}]: should handle an ${name} to open in modal`, () => {
  const previousState: TCurrentOrderState = {
    name: 'Бессмертный тестовый флюоресцентный бургер',
    order: {
      number: 40936,
    },
    success: true,
    isOpen: false,
  };

  expect(reducer(previousState, openOrder())).toEqual(
    {
      name: 'Бессмертный тестовый флюоресцентный бургер',
      order: {
        number: 40936,
      },
      success: true,
      isOpen: true,
    },
  );
});

test(`[${name}]: should handle a ${name} to initial state`, () => {
  const previousState: TCurrentOrderState = {
    name: 'Бессмертный тестовый флюоресцентный бургер',
    order: {
      number: 40936,
    },
    success: true,
    isOpen: false,
  };

  expect(reducer(previousState, resetOrder())).toEqual(
    initialState,
  );
});
