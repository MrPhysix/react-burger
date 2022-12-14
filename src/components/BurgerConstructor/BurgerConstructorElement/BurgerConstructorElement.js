import React, { useRef } from 'react';
import PropTypes from 'prop-types';
//
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
// redux
import { useDispatch, useSelector } from 'react-redux';
//
import { useDrag, useDrop } from 'react-dnd';
import style from './burger-constructor-element.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';
import { getConstructorIngredients } from '../../../services/reducers/constructorIngredientsSlice';

function BurgerConstructorElement({
  data, position,
  moveIngredient, index,
  id,
}) {
  // const
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((state) => state.constructorIngredients);
  const bunPosText = position && position === 'bottom' ? '(низ)' : position && '(вверх)';
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /* eslint no-param-reassign: "error" */
  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
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
    <li
      className={`${style.element} ${position && 'pl-8'} mr-4 `}
      ref={draggableRef}
    >
      {!position && <DragIcon type="primary" />}
      {!isDragging && (
      <ConstructorElement
        type={position}
        text={`${data.name} ${bunPosText || ''}`}
        thumbnail={data.image}
        price={data.price}
        isLocked={position}
        handleClose={handleRemoveFromConstructor}
        data-handler-id={handlerId}
      />
      )}
    </li>
  );
}

BurgerConstructorElement.propTypes = {
  data: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  moveIngredient: PropTypes.func.isRequired,
  index: PropTypes.number,
  id: PropTypes.string,
};

BurgerConstructorElement.defaultProps = {
  position: null,
  id: '',
  index: null,
};

export default BurgerConstructorElement;
