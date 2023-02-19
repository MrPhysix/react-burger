import reducer, {
  getConstructorIngredients,
  addConstructorIngredient,
  addConstructorBun,
  swapConstructorIngredients,
  resetConstructorIngredients,
} from './constructorIngredients';
import {
  IngredientType, TConstructorIngredients, TIngredient, TUser,
} from '../../types';

const name: string = 'constructor';

const initialState: TConstructorIngredients = {
  constructorIngredients: [],
  bun: undefined,
};

const mockedIngredients: Array<TIngredient> = [
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: IngredientType.main,
    __v: 0,
    _id: '60d3b41abdacab0026a733c8',
    _key: '96d3eea4-fa1e-41f3-bf1d-41758b3c53aa',
  },
  {
    calories: 420,
    carbohydrates: 33,
    fat: 244,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    name: 'Мясо бессмертных моллюсков Protostomia',
    price: 1337,
    proteins: 433,
    type: IngredientType.main,
    __v: 0,
    _id: '60d3b41abdacab0026a733c9',
    _key: 'f8861b34-a316-4bbc-b565-85c0f3827611',
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: IngredientType.main,
    __v: 0,
    _id: '60d3b41abdacab0026a733cb',
    _key: 'a6d106a0-9737-42e4-bb78-7039807766fe',
  },
];

const mockedBun: TIngredient = {
  _id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: IngredientType.bun,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
};

const mockedSauce: TIngredient = {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: IngredientType.sauce,
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  _key: 'ddbf3b6c-ef92-43fb-aa62-3294eea3bf87',
};

test(`[${name}]: should return the initial ${name} state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should handle constructor ingredients info`, () => {
  expect(reducer(initialState, getConstructorIngredients(mockedIngredients))).toEqual(
    {
      constructorIngredients: mockedIngredients,
      bun: undefined,
    },
  );
});

test(`[${name}]: should handle bun info`, () => {
  expect(reducer({
    constructorIngredients: mockedIngredients,
    bun: undefined,
  }, addConstructorBun(mockedBun))).toEqual(
    {
      constructorIngredients: mockedIngredients,
      bun: mockedBun,
    },
  );
});

test(`[${name}]: should handle add an ingredient`, () => {
  expect(reducer({
    constructorIngredients: mockedIngredients,
    bun: mockedBun,
  }, addConstructorIngredient(mockedSauce))).toEqual(
    {
      constructorIngredients: [
        ...mockedIngredients,
        mockedSauce,
      ],
      bun: mockedBun,
    },
  );
});

test(`[${name}]: should handle swap index in the ingredients array`, () => {
  expect(reducer({
    constructorIngredients: mockedIngredients,
    bun: mockedBun,
  }, swapConstructorIngredients([1, 2]))).toEqual(
    {
      constructorIngredients: [
        mockedIngredients[0],
        mockedIngredients[2],
        mockedIngredients[1],
      ],
      bun: mockedBun,
    },
  );
});

test(`[${name}]: should handle a ${name} info to initial state`, () => {
  const previousState: TConstructorIngredients = {
    constructorIngredients: mockedIngredients,
    bun: mockedBun,
  };

  expect(reducer(previousState, resetConstructorIngredients())).toEqual(
    initialState,
  );
});
