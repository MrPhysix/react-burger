import React from 'react';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
//
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import style from './ingredient-card.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';

function IngredientCard({ item, onClick, count }) {
  const [, dragRef] = useDrag({
    type: 'ingredientCard',
    item,
  });
  const location = useLocation();
  // handlers
  const handleOpen = () => {
    onClick(item);
  };

  return (
    <Link
      className={style.card}
      onClick={handleOpen}
      ref={dragRef}
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
    >
      {count && <div className={`text_type_digits-default ${style.counter}`}>{count}</div>}
      <img className="ml-4 mr-4" src={item.image} alt={item.name} />
      <div className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.name} text text_type_main-default`}>{item.name}</p>
    </Link>
  );
}

IngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};

IngredientCard.defaultProps = {
  count: null,
};

export default IngredientCard;
