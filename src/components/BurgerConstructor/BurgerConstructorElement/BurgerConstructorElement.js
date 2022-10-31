import React from 'react';
//
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
//

function BurgerConstructorElement({ data, position }) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <li className={`burger-constructor-element ${position && 'pl-8'} mr-4`} style={style}>
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

export default BurgerConstructorElement;
