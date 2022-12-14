import React, { useMemo } from 'react';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import addImg from '../../images/add.svg';
import style from './burger-constructor.module.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';
import { INGREDIENT_TYPES } from '../../utils/const';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import getOrderDetails from '../../utils/api/order';
import { setOrder, resetOrder, openOrder } from '../../services/reducers/order';
import {
  addConstructorBun,
  addConstructorIngredient,
  swapConstructorIngredients,
} from '../../services/reducers/constructorIngredientsSlice';

function BurgerConstructor() {
  // consts
  const dispatch = useDispatch();
  const { constructorIngredients, bun } = useSelector(
    (state) => state.constructorIngredients,
  );
  const { order } = useSelector((state) => state);
  //
  const totalPrice = useMemo(
    () => constructorIngredients.reduce((total, curr) => {
      if (curr.type === INGREDIENT_TYPES.BUN.TYPE) return total + curr.price * 2;
      return total + curr.price;
    }, 0),
    [constructorIngredients],
  );

  const handleOrderModal = {
    open: () => {
      const ids = constructorIngredients.map((i) => i._id);
      getOrderDetails(ids)
        .then((res) => {
          dispatch(setOrder(res));
        })
        .then(() => dispatch(openOrder()));
    },
    close: () => dispatch(resetOrder()),
  };

  const addIngredientToConstructor = (item) => {
    const isBun = item.type === INGREDIENT_TYPES.BUN.TYPE;
    if (isBun) {
      return dispatch(addConstructorBun(item));
    }

    const generatedId = uuidv4();

    return dispatch(addConstructorIngredient({ ...item, _key: generatedId }));
  };

  // r dnd
  const dropHandler = (item) => {
    addIngredientToConstructor(item);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredientCard',
    drop(item) {
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveIngredient = (fromIndex, toIndex) => {
    dispatch(swapConstructorIngredients([fromIndex, toIndex]));
  };

  const borderColor = isHover
    ? {
      outline: '5px #4C4CFF solid',
      boxShadow: 'inset 0 0 16px 8px rgba(51, 51, 255, .25), '
        + 'inset 0 0px 8px 8px rgba(51, 51, 255, .25), '
        + 'inset 0 4px 32px rgba(51, 51, 255, .5)',
      borderRadius: '25px',
    }
    : {};

  return (
    <>
      {order.isOpen && (
        <Modal handleClose={handleOrderModal.close}>
          <OrderDetails order={order} />
        </Modal>
      )}
      {(constructorIngredients.length === 0 && !bun) ? (
        <p
          style={borderColor}
          ref={dropTarget}
          className={`${style.noIngredient} text text_type_main-large`}
        >
          {isHover ? (
            <img src={addImg} alt="addImg" />
          ) : (
            <span>???????????????? ??????????????????????</span>
          )}
        </p>
      ) : (
        <section
          className={`${style.element} pt-25 pl-4`}
          ref={dropTarget}
          style={borderColor}
        >
          <ul className={style.ul}>
            {bun && (
              <BurgerConstructorElement
                moveIngredient={moveIngredient}
                data={bun}
                position="top"
              />
            )}
            <ul className={`${style.scroll} scroll`}>
              {
                constructorIngredients.map(
                  (item, index) => (
                    <BurgerConstructorElement
                      moveIngredient={moveIngredient}
                      key={item._key}
                      data={item}
                      index={index}
                      id={item._key}
                    />
                  ),
                )
              }
            </ul>
            {bun && (
              <BurgerConstructorElement
                moveIngredient={moveIngredient}
                data={bun}
                position="bottom"
              />
            )}
          </ul>
          <div className={`${style.info} mt-10`}>
            <div className={`${style.price} mr-10`}>
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={() => handleOrderModal.open()}
            >
              ???????????????? ??????????
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

export default BurgerConstructor;
