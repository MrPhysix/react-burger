import React from 'react';

import style from './ingredient-details.module.css';
import { TIngredient } from '../../../types';
import { Loader } from '../../App/App';
//

interface INutritionValue {
  children: React.ReactNode;
  value: number;
}

function NutritionValue({ children, value }: INutritionValue) {
  return (
    <li className={style.value}>
      <h4 className="text text_type_main-default text_color_inactive">{children}</h4>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </li>
  );
}

interface IIngredientDetails {
  ingredient?: TIngredient
}

function IngredientDetails({ ingredient }: IIngredientDetails) {
  if (!ingredient) return <Loader />;

  return (
    <>
      <h3 className={`text text_type_main-large mb-10 ${style.h3}`}>Детали ингредиента</h3>
      <img src={ingredient.image_large} className="ml-4 mr-4" alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={style.ul}>
        <NutritionValue value={ingredient.calories}>Калории,ккал</NutritionValue>
        <NutritionValue value={ingredient.proteins}>Белки, г</NutritionValue>
        <NutritionValue value={ingredient.fat}>Жиры, г</NutritionValue>
        <NutritionValue value={ingredient.carbohydrates}>Углеводы, г</NutritionValue>
      </ul>
    </>
  );
}

IngredientDetails.defaultProps = {
  ingredient: null,
};

export default IngredientDetails;
