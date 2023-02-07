import React, {
  useState, useMemo, useEffect, useRef,
} from 'react';
//
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
// redux
import { useSelector } from 'react-redux';
//
import { useNavigate } from 'react-router-dom';
import IngredientsList from './IngredientsList/IngredientsList';
import style from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/const';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';
import {
  openModal,
  resetModalInfo,
  setModalInfo,
} from '../../services/reducers/modal';
import { TIngredient } from '../../types';
import { RootState, useAppDispatch } from '../../services';

function BurgerIngredients() {
  //
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN.TYPE);
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { modal } = useSelector((state: RootState) => state);
  //
  const navigate = useNavigate();
  // refs
  const [
    scrollRef, bunRef, mainRef, sauceRef,
  ] = [useRef<HTMLUListElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)];
  //

  const bun = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [ingredients],
  );

  const main = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === INGREDIENT_TYPES.MAIN.TYPE),
    [ingredients],
  );
  const sauce = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === INGREDIENT_TYPES.SAUCE.TYPE),
    [ingredients],
  );

  // handlers
  const handleDetailsModal = (item: TIngredient): void => {
    dispatch(setModalInfo(item));
    dispatch(openModal());
  };

  const handleDetailsModalClose = (): void => {
    dispatch(resetModalInfo());
    navigate('/');
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const scrollListener = (): null => {
      if (!scrollElement || !bunRef.current || !mainRef.current || !sauceRef.current) return null;

      const scrollElementTop = scrollElement.getBoundingClientRect().top;
      const bunTab = Math.abs(scrollElementTop - bunRef.current.getBoundingClientRect().top);
      const mainTab = Math.abs(scrollElementTop - mainRef.current.getBoundingClientRect().top);
      const sauceTab = Math.abs(scrollElementTop - sauceRef.current.getBoundingClientRect().top);

      setCurrent((state) => {
        switch (Math.min(bunTab, mainTab, sauceTab)) {
          case bunTab:
            return INGREDIENT_TYPES.BUN.TYPE;
          case mainTab:
            return INGREDIENT_TYPES.MAIN.TYPE;
          case sauceTab:
            return INGREDIENT_TYPES.SAUCE.TYPE;

          default: return state;
        }
      });
      return null;
    };

    scrollElement?.addEventListener('scroll', scrollListener);

    return () => {
      scrollElement?.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scrollToList = (ref: React.RefObject<HTMLDivElement>
    | React.RefObject<HTMLUListElement>) => {
    ref.current?.scrollIntoView();
  };
  const handleTabClick = (type: string, ref: React.RefObject<HTMLDivElement>
    | React.RefObject<HTMLUListElement>) => {
    scrollToList(ref);
    setCurrent(type);
  };

  return (
    <>
      {modal.item && modal.isOpen && (
      <Modal handleClose={handleDetailsModalClose}>
        <IngredientDetails ingredient={modal.item} />
      </Modal>
      )}
      <section className={`${style.ingredients} pt-10`}>
        <h2 className="text text text_type_main-large mb-5">Соберите бургер</h2>
        <ul className={style.flex}>
          <Tab value="bun" active={current === INGREDIENT_TYPES.BUN.TYPE} onClick={() => handleTabClick(INGREDIENT_TYPES.BUN.TYPE, bunRef)}>
            {INGREDIENT_TYPES.BUN.NAME}
          </Tab>
          <Tab value="main" active={current === INGREDIENT_TYPES.MAIN.TYPE} onClick={() => handleTabClick(INGREDIENT_TYPES.MAIN.TYPE, mainRef)}>
            {INGREDIENT_TYPES.MAIN.NAME}
          </Tab>
          <Tab value="sauce" active={current === INGREDIENT_TYPES.SAUCE.TYPE} onClick={() => handleTabClick(INGREDIENT_TYPES.SAUCE.TYPE, sauceRef)}>
            {INGREDIENT_TYPES.SAUCE.NAME}
          </Tab>
        </ul>
        <ul className={`${style.ul} mt-10 scroll`} ref={scrollRef} id="scroll-list">
          <IngredientsList
            ref={bunRef}
            ingredients={bun}
            name={INGREDIENT_TYPES.BUN.NAME}
            onIngredientClick={handleDetailsModal}
          />
          <IngredientsList
            ref={mainRef}
            ingredients={main}
            name={INGREDIENT_TYPES.MAIN.NAME}
            onIngredientClick={handleDetailsModal}
          />
          <IngredientsList
            ref={sauceRef}
            ingredients={sauce}
            name={INGREDIENT_TYPES.SAUCE.NAME}
            onIngredientClick={handleDetailsModal}
          />
        </ul>
      </section>
    </>
  );
}

export default BurgerIngredients;
