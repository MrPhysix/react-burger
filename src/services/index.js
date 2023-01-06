import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsSlice';
import constructorIngredientsReducer from './reducers/constructorIngredientsSlice';
import ingredientDetailsReducer from './reducers/ingredientDetails';
import orderReducer from './reducers/order';
import userReducer from './reducers/user';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    user: userReducer,
  },
});
