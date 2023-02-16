import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ingredientsReducer from './reducers/ingredients';
import constructorIngredientsReducer from './reducers/constructorIngredients';
import modalReducer from './reducers/modal';
import orderReducer from './reducers/order';
import userReducer from './reducers/user';
import wsOrdersReducer, { wsOrdersActions } from './reducers/wsOrders';
import socketMiddleware from './middleware/socketMiddleware';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    user: userReducer,
    wsOrders: wsOrdersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(wsOrdersActions)),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
