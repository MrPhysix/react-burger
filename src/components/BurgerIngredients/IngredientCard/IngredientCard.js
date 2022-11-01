import React from 'react';
import PropTypes from 'prop-types';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './ingredient-card.module.css';

function IngredientCard({ name, img, price }) {
  return (
    <section className={style.card}>
      <img className="ml-4 mr-4" src={img} alt={name} />
      <div className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.name} text text_type_main-default`}>{name}</p>
    </section>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default IngredientCard;
