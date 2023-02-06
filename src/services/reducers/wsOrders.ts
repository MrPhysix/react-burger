import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../types';

/* eslint-disable */
enum wsStatus {
  CONNECTION_START = 'CONNECTION_START',
  CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
  CONNECTION_CLOSED = 'CONNECTION_CLOSED',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  GET_MESSAGE = 'GET_MESSAGE',
  SEND_MESSAGE = 'SEND_MESSAGE',
}
/* eslint-enable */

type TInitialState = {
  orders: Array<TOrder>,
  total: number,
  totalToday: number,
  status: wsStatus,
}

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: wsStatus.CONNECTION_CLOSED,
};

const wsOrdersSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsStart: (state, { payload }) => {
      state.status = wsStatus.CONNECTION_START;
    },
    wsOpen: (state) => {
      state.status = wsStatus.CONNECTION_SUCCESS;
    },
    wsClose: (state) => {
      state.status = wsStatus.CONNECTION_CLOSED;
    },
    wsMessage: (state, { payload }) => {
      state.status = wsStatus.GET_MESSAGE;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    wsSend: (state) => {
      state.status = wsStatus.SEND_MESSAGE;
    },
    wsError: (state) => {
      state.status = wsStatus.CONNECTION_ERROR;
    },
  },
});

export const wsOrdersActions = wsOrdersSlice.actions;

export default wsOrdersSlice.reducer;
