import React from 'react';
import PropTypes from 'prop-types';
//
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import style from './burger-constructor-element.module.css';
import dataObjectPropTypes from '../../../utils/propTypes';

function BurgerConstructorElement({ data, position }) {
  return (
    <li className={`${style.element} ${position && 'pl-8'} mr-4 no-select`}>
      {!position && <DragIcon type="primary" />}
      <ConstructorElement
        type={position}
        text={data.name}
        thumbnail={data.image}
        price={data.price}
        isLocked={position}
      />
    </li>
  );
}

BurgerConstructorElement.propTypes = {
  data: PropTypes.objectOf(dataObjectPropTypes).isRequired,
  position: PropTypes.string,
};

BurgerConstructorElement.defaultProps = {
  position: null,
};

export default BurgerConstructorElement;
