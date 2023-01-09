import React from 'react';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
//
import PropTypes from 'prop-types';
import style from './ingredient-card.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';

function IngredientCard({ item, onClick }) {
  const [, dragRef] = useDrag({
    type: 'ingredientCard',
    item,
  });

  // handlers
  const handleOpen = () => {
    onClick(item);
  };

  return (
    <section role="presentation" className={style.card} onClick={handleOpen} ref={dragRef}>
      <img className="ml-4 mr-4" src={item.image} alt={item.name} />
      <div className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.name} text text_type_main-default`}>{item.name}</p>
    </section>
  );
}

IngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientCard;
