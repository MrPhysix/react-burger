import React, { useRef } from 'react';
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
import { getConstructorIngredients } from '../../../services/reducers/constructorIngredientsSlice';
import { TIngredient } from '../../../types';

type TdragItem = {
  id: string;
  index: number;
}

interface IBurgerConstructorElement {
  data: TIngredient;
  position?: 'top' | 'bottom';
  moveIngredient: Function;
  index?: number;
  id?: string;
}

function BurgerConstructorElement({
  data, position,
  moveIngredient, index,
  id,
}: IBurgerConstructorElement) {
  // const
  const dispatch = useDispatch();
  const { constructorIngredients }: any = useSelector<any>((state) => state.constructorIngredients);
  const bunPosText = position && position === 'bottom' ? '(низ)' : position && '(вверх)';
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /* eslint no-param-reassign: "error" */
  const [{ handlerId }, drop]: any = useDrop<any>({
    accept: 'constructorIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(dragItem: TdragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      // @ts-ignore
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // Dragging upwards
      // @ts-ignore
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveIngredient(dragIndex, hoverIndex);
      // @ts-ignore
      dragItem.index = hoverIndex;
    },
  });
  drag(drop(ref));
  // handlers
  const handleRemoveFromConstructor = () => {
    const updatedIngredients = constructorIngredients.filter((item: TIngredient) => item !== data);
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
        isLocked={Boolean(position)}
        handleClose={handleRemoveFromConstructor}
        data-handler-id={handlerId}
      />
      )}
    </li>
  );
}

BurgerConstructorElement.defaultProps = {
  position: null,
  id: '',
  index: null,
};

export default BurgerConstructorElement;
