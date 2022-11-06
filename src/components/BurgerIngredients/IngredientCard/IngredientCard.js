import React, { useState } from 'react';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './ingredient-card.module.css';
import ingredientPropTypes from '../../../utils/propTypes';
import IngredientDetails from '../../Modal/IngredientDetails/IngredientDetails';

function IngredientCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  // handlers
  const handleClose = () => {
    setIsOpen(() => false);
  };

  return (
    <>
      { item && isOpen
        && <IngredientDetails data={item} isOpen={isOpen} handleClose={handleClose} />}
      <section role="presentation" className={style.card} onClick={() => setIsOpen(true)}>
        <img className="ml-4 mr-4" src={item.image} alt={item.name} />
        <div className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
          {item.price}
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.name} text text_type_main-default`}>{item.name}</p>
      </section>
    </>
  );
}

IngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired,
};

export default IngredientCard;
