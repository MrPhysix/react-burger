import React from 'react';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import './IngredientCard.css';

function IngredientCard({ name, img, price }) {
  return (
    <section className="ingredient-card">
      <img className="ingredient-card__image ml-4 mr-4" src={img} alt={name} />
      <div className="ingredient-card__price text text_type_digits-default mt-1 mb-1">
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <p className="ingredient-card__name text text_type_main-default">{name}</p>
    </section>
  );
}

export default IngredientCard;
