import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/propTypes';
import style from './ingredient-details.module.css';
//

function NutritionValue({ children, value }) {
  return (
    <li className={style.value}>
      <h4 className="text text_type_main-default text_color_inactive">{children}</h4>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </li>
  );
}

function IngredientDetails({ ingredient }) {
  return (
    <>
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

NutritionValue.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
