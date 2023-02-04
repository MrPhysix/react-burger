import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsSlice';
import constructorIngredientsReducer from './reducers/constructorIngredientsSlice';
import modalReducer from './reducers/modal';
import orderReducer from './reducers/order';
import userReducer from './reducers/user';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    user: userReducer,
  },
});
