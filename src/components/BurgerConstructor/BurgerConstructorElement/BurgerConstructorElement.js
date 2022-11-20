import React, { useRef } from 'react';
import PropTypes from 'prop-types';
//
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// import { ConstructorContext } from '../../../utils/context';
//
import { useDrag, useDrop } from 'react-dnd';
import style from './burger-constructor-element.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';
import { getConstructorIngredients } from '../../../store/reducers/constructorIngredientsSlice';

function BurgerConstructorElement({
  data, position,
  moveIngredient, index,
}) {
  // const
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((state) => state.constructorIngredients);
  const bunPosText = position && position === 'bottom' ? '(низ)' : position && '(вверх)';
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /* eslint no-param-reassign: "error" */
  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    item: data,
    hover(dragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveIngredient(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });
  drag(drop(ref));
  // handlers
  const handleRemoveFromConstructor = () => {
    const updatedIngredients = constructorIngredients.filter((item) => item !== data);
    dispatch(getConstructorIngredients(updatedIngredients));
  };

  const draggableRef = !position ? ref : null;

  return (
    !isDragging && (
    <li className={`${style.element} ${position && 'pl-8'} mr-4 `} ref={draggableRef}>
      {!position && <DragIcon type="primary" />}
      <ConstructorElement
        type={position}
        text={`${data.name} ${bunPosText || ''}`}
        thumbnail={data.image}
        price={data.price}
        isLocked={position}
        handleClose={handleRemoveFromConstructor}
      />
    </li>
    )
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
