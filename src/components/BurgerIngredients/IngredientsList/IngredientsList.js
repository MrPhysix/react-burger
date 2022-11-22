import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
//
import IngredientCard from '../IngredientCard/IngredientCard';
import style from './ingredients-list.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';

const IngredientsList = forwardRef(({ ingredients, onIngredientClick, name }, ref) => (
  <section className="ingredients-list">
    <h3 ref={ref} className="ingredients-list__title text text_type_main-medium">{name}</h3>
    <ul className={`${style.ul} pt-6 pl-4 pr-4`}>
      {
          ingredients.map((item) => (
            <IngredientCard
              key={item._id}
              item={item}
              onClick={onIngredientClick}
            />
          ))
        }
    </ul>
  </section>
));

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientsList;
