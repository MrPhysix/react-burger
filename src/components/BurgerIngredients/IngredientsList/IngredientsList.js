import React from 'react';
import PropTypes from 'prop-types';
//
import IngredientCard from '../IngredientCard/IngredientCard';
import style from './ingredients-list.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';

function IngredientsList({ ingredients, name }) {
  return (
    <section className="ingredients-list">
      <h3 className="ingredients-list__title text text_type_main-medium">{name}</h3>
      <ul className={`${style.ul} pt-6 pl-4 pr-4`}>
        {
        ingredients.map((item) => (
          <IngredientCard
            key={item._key}
            item={item}
          />
        ))
      }
      </ul>
    </section>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientsList;
