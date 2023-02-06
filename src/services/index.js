import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsSlice';
import constructorIngredientsReducer from './reducers/constructorIngredientsSlice';
import modalReducer from './reducers/modal';
import orderReducer from './reducers/order';
import userReducer from './reducers/user';
import wsOrdersReducer, { wsOrdersActions } from './reducers/wsOrders';
import socketMiddleware from './middleware/socketMiddleware';

export default configureStore({
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
