import React, { useContext } from 'react';
import PropTypes from 'prop-types';
//
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './burger-constructor-element.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';
import { ConstructorContext } from '../../../utils/context';

function BurgerConstructorElement({ data, position }) {
  // const
  const { selectedIngredients, setSelectedIngredients } = useContext(ConstructorContext);
  const bunPosText = position && position === 'bottom' ? '(низ)' : position && '(вверх)';

  // handlers
  const handleRemoveFromConstructor = () => {
    const updatedIngredients = selectedIngredients.filter((item) => item !== data);
    setSelectedIngredients(updatedIngredients);
  };

  return (
    <li className={`${style.element} ${position && 'pl-8'} mr-4 no-select`}>
      {!position && <DragIcon type="primary" />}
      <ConstructorElement
        type={position}
        text={`${data.name} ${bunPosText}`}
        thumbnail={data.image}
        price={data.price}
        isLocked={position}
        handleClose={handleRemoveFromConstructor}
      />
    </li>
  );
}

BurgerConstructorElement.propTypes = {
  data: ingredientPropTypes.isRequired,
  position: PropTypes.string,
};

BurgerConstructorElement.defaultProps = {
  position: null,
};

export default BurgerConstructorElement;
