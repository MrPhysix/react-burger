import React, {
  useMemo, useContext,
} from 'react';
//
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
//
import { useDispatch, useSelector } from 'react-redux';
import style from './burger-constructor.module.css';
import BurgerConstructorElement from './BurgerConstructorElement/BurgerConstructorElement';
import { INGREDIENT_TYPES } from '../../utils/const';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import { LoadingContext } from '../../utils/context';
import getOrderDetails from '../../utils/api/order';
import { setOrder, resetOrder, openOrder } from '../../store/reducers/order';

function BurgerConstructor() {
  // consts
  const dispatch = useDispatch();
  // const { selectedIngredients } = useContext(ConstructorContext);
  const { constructorIngredients } = useSelector((state) => state.constructorIngredients);
  const { order } = useSelector((state) => state);
  const { setIsLoading } = useContext(LoadingContext);
  //
  // const [order, setOrder] = useState({});

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

  // states

  // const [orderIsOpen, setOrderIsOpen] = useState(false);

  // handlers

  // const handleOrderModal = {
  //   open: () => {
  //     // setIsLoading(true); не получается лоадер сделать так((
  //     const ids = constructorIngredients.map((i) => i._id);
  //     getOrderDetails(ids)
  //       .then((res) => {
  //         setOrder(res);
  //         setIsLoading(false);
  //       })
  //       .then(() => setOrderIsOpen(true))
  //       .then(() => orderIsOpen && setOrder({})); // желательно очищать конструктор
  //     // после успешного получения номера заказа с сервера в блоке then
  //   },
  //   close: () => setOrderIsOpen(false),
  // };

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

  if (!constructorIngredients || constructorIngredients.length === 0) return <p className={`${style.noIngredient} text text_type_main-large`}>Ингредиенты не выбраны</p>;

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
      <section className={`${style.element} pt-25 pl-4`}>
        <ul className={style.ul}>
          {bun && <BurgerConstructorElement data={bun} position="top" />}
          <ul className={`${style.scroll} scroll`}>
            {
              noBunIngredients.map((item) => (
                <BurgerConstructorElement
                  key={item._key}
                  data={item}
                />
              ))
           }
          </ul>
          {bun && <BurgerConstructorElement data={bun} position="bottom" />}
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
    </>
  );
}

export default BurgerConstructor;
