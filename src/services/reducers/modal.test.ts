import reducer, {
  setModalInfo,
  resetModalInfo,
  openModal,
} from './modal';

import {
  IngredientType, TIngredient, TModal,
} from '../../types';

const name: string = 'modal';

const initialState: TModal = {
  item: null,
  isOpen: false,
};

const mockedItem: TIngredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: IngredientType.bun,
  __v: 0,
  _id: '60d3b41abdacab0026a733c6',
};

test(`[${name}]: should return the initial state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should handle a ${name} info`, () => {
  expect(reducer(initialState, setModalInfo(mockedItem))).toEqual(
    {
      item: mockedItem,
      isOpen: false,
    },
  );
});

test(`[${name}]: should handle ${name} open`, () => {
  const previousState: TModal = {
    item: mockedItem,
    isOpen: false,
  };

  expect(reducer(previousState, openModal())).toEqual(
    {
      item: mockedItem,
      isOpen: true,
    },
  );
});

test(`[${name}]: should handle a ${name} info to initial state`, () => {
  const previousState: TModal = {
    item: mockedItem,
    isOpen: true,
  };

  expect(reducer(previousState, resetModalInfo())).toEqual(
    initialState,
  );
});
