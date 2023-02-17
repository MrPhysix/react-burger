import reducer, { TInitialState, wsStatus, wsOrdersActions } from './wsOrders';
import { mockedIngredients } from '../../utils/mocked';

const name: string = 'wsOrders';

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: wsStatus.CONNECTION_CLOSED,
};

const mockedOrders = [
  {
    _id: '63ef5ff5936b17001be5eb02',
    ingredients: mockedIngredients,
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2023-02-17T11:07:33.120Z',
    updatedAt: '2023-02-17T11:07:33.560Z',
    number: 41033,
  },
  {
    _id: '63ef5d68936b17001be5eafb',
    ingredients: mockedIngredients.slice(0, 2),
    status: 'done',
    name: 'Space люминесцентный флюоресцентный традиционный-галактический бургер',
    createdAt: '2023-02-17T10:56:40.408Z',
    updatedAt: '2023-02-17T10:56:40.805Z',
    number: 41030,
  },
];

const mockedPayload = {
  orders: mockedOrders,
  total: 40942,
  totalToday: 109,
};

test(`[${name}]: should return the initial ${name} state`, () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    initialState,
  );
});

test(`[${name}]: should set status to 'CONNECTION_START'`, () => {
  expect(reducer(initialState, wsOrdersActions.wsStart)).toEqual({
    orders: [],
    total: 0,
    totalToday: 0,
    status: wsStatus.CONNECTION_START,
  });
});

test(`[${name}]: should set status to 'CONNECTION_SUCCESS'`, () => {
  expect(reducer(initialState, wsOrdersActions.wsOpen)).toEqual({
    orders: [],
    total: 0,
    totalToday: 0,
    status: wsStatus.CONNECTION_SUCCESS,
  });
});

test(`[${name}]: should set status to 'SEND_MESSAGE'`, () => {
  expect(reducer(initialState, wsOrdersActions.wsSend)).toEqual({
    orders: [],
    total: 0,
    totalToday: 0,
    status: wsStatus.SEND_MESSAGE,
  });
});

test(`[${name}]: handle webSocket GET Message`, () => {
  expect(reducer(initialState, wsOrdersActions.wsMessage(mockedPayload))).toEqual({
    orders: mockedOrders,
    total: mockedPayload.total,
    totalToday: mockedPayload.totalToday,
    status: wsStatus.GET_MESSAGE,
  });
});

test(`[${name}]: should set status to 'CONNECTION_ERROR'`, () => {
  expect(reducer(initialState, wsOrdersActions.wsError)).toEqual({
    orders: [],
    total: 0,
    totalToday: 0,
    status: wsStatus.CONNECTION_ERROR,
  });
});

test(`[${name}]: should handle a ${name} info to initial state`, () => {
  const previousState: TInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: wsStatus.GET_MESSAGE,
  };

  expect(reducer(previousState, wsOrdersActions.wsClose())).toEqual(
    initialState,
  );
});
