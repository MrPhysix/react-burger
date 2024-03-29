import React, { useMemo } from 'react';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import addImg from '../../images/add.svg';
import style from './burger-constructor.module.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';
import Modal from '../Modal/Modal';
import OrderSubmitDetails from '../Modal/OrderSubmitDetails/OrderSubmitDetails';
import { getOrderDetails } from '../../utils/api/order';
import { setOrder, resetOrder, openOrder } from '../../services/reducers/order';
import {
  addConstructorBun,
  addConstructorIngredient,
  swapConstructorIngredients,
  resetConstructorIngredients,
} from '../../services/reducers/constructorIngredients';
import { IngredientType, TCurrentOrderState, TIngredient } from '../../types';
import { RootState, useAppDispatch } from '../../services';

const getConstructorIngredients = (state: RootState | any) => state.constructorIngredients;
const getUser = (state: RootState) => state.user;
const getOrder = (state: RootState) => state.order;

function BurgerConstructor() {
  // consts useDispatch
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // states
  const { constructorIngredients, bun } = useSelector(getConstructorIngredients);
  const order = useSelector(getOrder);
  const user = useSelector(getUser);
  //
  const bunPrice = bun ? bun.price * 2 : 0;

  const totalPrice = useMemo(
    () => constructorIngredients.reduce((total: number, curr: TIngredient) => {
      if (curr.type === IngredientType.bun) return total + curr.price * 2;
      return total + curr.price;
    }, 0) + bunPrice,
    [constructorIngredients, bun],
  );

  const handleOrderModal = {
    open: () => {
      const ids = [...constructorIngredients.map((i: TIngredient) => i._id), bun._id, bun._id];
      dispatch(openOrder());
      getOrderDetails(ids)
        .then((res) => {
          dispatch(setOrder(res as TCurrentOrderState));
        });
      // .then(() => dispatch(openOrder()));
    },
    close: () => {
      dispatch(resetOrder());
      dispatch(resetConstructorIngredients());
    },
  };

  const handleOrderSubmit = () => {
    if (!user || user?.success === false) navigate('/login', { state: { from: location } });
    handleOrderModal.open();
  };

  const addIngredientToConstructor = (item: TIngredient) => {
    const isBun = item.type === IngredientType.bun;
    if (isBun) {
      return dispatch(addConstructorBun(item));
    }

    const generatedId = uuidv4();

    return dispatch(addConstructorIngredient({ ...item, _key: generatedId }));
  };

  // r dnd
  const dropHandler = (item: TIngredient) => {
    addIngredientToConstructor(item);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredientCard',
    drop(item: TIngredient) {
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveIngredient = (fromIndex: number, toIndex: number): void => {
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
          <OrderSubmitDetails order={order} />
        </Modal>
      )}
      {(constructorIngredients.length === 0 && !bun) ? (
        <section
          data-cy="constructor-target"
          style={borderColor}
          ref={dropTarget}
          className={`${style.noIngredient} text text_type_main-large`}
        >
          {isHover ? (
            <img src={addImg} alt="addImg" />
          ) : (
            <span>Добавьте ингредиенты</span>
          )}
        </section>
      ) : (
        <section
          data-cy="constructor-target"
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
            <ul className={`${style.scroll} scroll`} data-cy="constructor-list">
              {
                constructorIngredients.map(
                  (item: TIngredient & { _key: string}, index: number) => (
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
              onClick={handleOrderSubmit}
            >
              Оформить заказ
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

export default BurgerConstructor;
