import React, {
  useState, useMemo, useEffect,
} from 'react';
//
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
// redux
import { useDispatch, useSelector } from 'react-redux';
//
import IngredientsList from './IngredientsList/IngredientsList';
import style from './burger-ingredients.module.css';
import { INGREDIENT_TYPES } from '../../utils/const';
import Modal from '../Modal/Modal';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';
import {
  openIngredientDetails,
  resetIngredientDetails,
  setIngredientDetails,
} from '../../store/reducers/ingredientDetails';

function BurgerIngredients() {
  //
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN[0]);
  // const [modal, setModal] = useState({ isOpen: false, item: null });
  const { ingredientDetails } = useSelector((state) => state);
  console.log('ingredientDetails', ingredientDetails);
  //
  const bun = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.BUN.TYPE),
    [ingredients],
  );

  const main = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.MAIN.TYPE),
    [ingredients],
  );
  const sauce = useMemo(
    () => ingredients.filter((item) => item.type === INGREDIENT_TYPES.SAUCE.TYPE),
    [ingredients],
  );

  // handlers
  const handleDetailsModal = (item) => {
    // setModal({ item, isOpen: true });
    console.log('item', item);
    dispatch(setIngredientDetails(item));
    dispatch(openIngredientDetails());
  };

  useEffect(() => {
    const scrollElement = document.getElementById('scroll-list');
    const element = document.getElementById('1');
    const element2 = document.getElementById('2');
    const element3 = document.getElementById('3');

    const scrollListener = () => {
      // console.log('scrollElement', scrollElement.getBoundingClientRect());
      console.log('element', element.getBoundingClientRect().top === scrollElement.getBoundingClientRect().height - scrollElement.getBoundingClientRect().top);
      console.log('element2', element2.getBoundingClientRect().top === scrollElement.getBoundingClientRect().height);
      console.log('element3', element3.getBoundingClientRect().top === scrollElement.getBoundingClientRect().height);
    };
    scrollElement.addEventListener('scroll', scrollListener);
    return () => {
      scrollElement.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <>
      { ingredientDetails.item !== {} && ingredientDetails.isOpen && (
      <Modal handleClose={() => dispatch(resetIngredientDetails())}>
        <IngredientDetails ingredient={ingredientDetails.item} />
      </Modal>
      )}
      <section className={`${style.ingredients} pt-10`}>
        <h2 className="text text text_type_main-large mb-5">Соберите бургер</h2>
        <ul className={style.flex}>
          <Tab value="bun" active={current === INGREDIENT_TYPES.BUN.TYPE} onClick={setCurrent}>
            {INGREDIENT_TYPES.BUN.NAME}
          </Tab>
          <Tab value="main" active={current === INGREDIENT_TYPES.MAIN.TYPE} onClick={setCurrent}>
            {INGREDIENT_TYPES.MAIN.NAME}
          </Tab>
          <Tab value="sauce" active={current === INGREDIENT_TYPES.SAUCE.TYPE} onClick={setCurrent}>
            {INGREDIENT_TYPES.SAUCE.NAME}
          </Tab>
        </ul>
        <ul className={`${style.ul} mt-10 scroll`} id="scroll-list">
          <IngredientsList
            id="1"
            ingredients={bun}
            name={INGREDIENT_TYPES.BUN.NAME}
            onIngredientClick={() => handleDetailsModal}
          />
          <IngredientsList
            id="2"
            ingredients={main}
            name={INGREDIENT_TYPES.MAIN.NAME}
            onIngredientClick={() => handleDetailsModal}
          />
          <IngredientsList
            id="3"
            ingredients={sauce}
            name={INGREDIENT_TYPES.SAUCE.NAME}
            onIngredientClick={() => handleDetailsModal}
          />
        </ul>
      </section>
    </>
  );
}

export default BurgerIngredients;
