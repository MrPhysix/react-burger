import React, {
  useContext, useMemo, useCallback,
} from 'react';
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
import { LoadingContext } from '../../utils/context';
import getOrderDetails from '../../utils/api/order';
import { setOrder, resetOrder, openOrder } from '../../store/reducers/order';
import {
  addConstructorIngredient,
  getConstructorIngredients,
  swapConstructorIngredients,
} from '../../store/reducers/constructorIngredientsSlice';

function BurgerConstructor() {
  // consts
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((state) => state.constructorIngredients);
  const { order } = useSelector((state) => state);
  const { setIsLoading } = useContext(LoadingContext);
  //
  const bun = useMemo(
    () => constructorIngredients.length > 0
      && constructorIngredients.find((item) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [constructorIngredients],
  );

  const noBunIngredients = useMemo(
    () => constructorIngredients.filter((item) => item.type !== INGREDIENT_TYPES.BUN.TYPE),
    [constructorIngredients],
  );

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
          setIsLoading(false);
        })
        .then(() => dispatch(openOrder()));
    },
    close: () => dispatch(resetOrder()),
  };

  const addIngredientToConstructor = (item) => {
    const isBun = item.type === INGREDIENT_TYPES.BUN.TYPE;
    if (isBun) {
      const updatedIngredients = constructorIngredients.filter((i) => i.type !== item.type);
      dispatch(getConstructorIngredients(updatedIngredients));
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
    dispatch(swapConstructorIngredients(([fromIndex, toIndex])));
  };

  const borderColor = isHover ? {
    outline: '5px #4C4CFF solid',
    boxShadow: 'inset 0 0 16px 8px rgba(51, 51, 255, .25), inset 0 0px 8px 8px rgba(51, 51, 255, .25), inset 0 4px 32px rgba(51, 51, 255, .5)',
    borderRadius: '25px',
  } : {};

  // if (!constructorIngredients || constructorIngredients.length === 0) {
  //   return (
  //     <p
  //       style={borderColor}
  //       ref={dropTarget}
  //       className={`${style.noIngredient} text text_type_main-large`}
  //     >
  //       {
  //       isHover
  //         ? <img src={addImg} alt="addImg" />
  //         : <span>Добавьте ингредиенты</span>
  //     }
  //     </p>
  //   );
  // }

  const renderBurgerConstructorElement = useCallback((item, index) => (
    <BurgerConstructorElement
      moveIngredient={moveIngredient}
      key={item._key}
      data={item}
      index={index}
    />
  ), []);

  return (
    <>
      {
          order.isOpen
          && (
            <Modal handleClose={() => handleOrderModal.close()}>
              <OrderDetails order={order} />
            </Modal>
          )
      }
      { (!constructorIngredients || constructorIngredients.length === 0)
        ? (
          <p
            style={borderColor}
            ref={dropTarget}
            className={`${style.noIngredient} text text_type_main-large`}
          >
            {
            isHover
              ? <img src={addImg} alt="addImg" />
              : <span>Добавьте ингредиенты</span>
          }
          </p>
        )
        : (
          <section className={`${style.element} pt-25 pl-4`} ref={dropTarget} style={borderColor}>
            <ul className={style.ul}>
              {bun && <BurgerConstructorElement moveIngredient={moveIngredient} data={bun} position="top" />}
              <ul className={`${style.scroll} scroll`}>
                {
                  noBunIngredients.map((item, index) => renderBurgerConstructorElement(item, index))
                }
              </ul>
              {bun && <BurgerConstructorElement moveIngredient={moveIngredient} data={bun} position="bottom" />}
            </ul>
            <div className={`${style.info} mt-10`}>
              <div className={`${style.price} mr-10`}>
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size="large" htmlType="button" onClick={() => handleOrderModal.open()}>
                Оформить заказ
              </Button>
            </div>
          </section>
        )}
    </>
  );
}

export default BurgerConstructor;
