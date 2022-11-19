import React from 'react';
//
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addConstructorIngredient, getConstructorIngredients } from '../../../store/reducers/constructorIngredientsSlice';
//
import style from './ingredient-card.module.css';
import { ingredientPropTypes } from '../../../utils/propTypes';
import { INGREDIENT_TYPES } from '../../../utils/const';

function IngredientCard({ item, onClick }) {
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((state) => state.constructorIngredients);
  // const { selectedIngredients, setSelectedIngredients } = useContext(ConstructorContext);
  // handlers
  const addIngredientToConstructor = () => {
    const isBun = item.type === INGREDIENT_TYPES.BUN.TYPE;
    if (isBun) {
      const updatedIngredients = constructorIngredients.filter((i) => i.type !== item.type);
      // setSelectedIngredients(updatedIngredients);
      dispatch(getConstructorIngredients(updatedIngredients));
    }

    const generatedId = uuidv4();

    // return setSelectedIngredients((prev) => [...prev, { ...item, _key: generatedId }]);
    return dispatch(addConstructorIngredient({ ...item, _key: generatedId }));
  };

  const handleOpen = () => {
    onClick(item);
    addIngredientToConstructor();
  };

  return (
    <section role="presentation" className={style.card} onClick={handleOpen}>
      <img className="ml-4 mr-4" src={item.image} alt={item.name} />
      <div className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.name} text text_type_main-default`}>{item.name}</p>
    </section>
  );
}

IngredientCard.propTypes = {
  item: ingredientPropTypes.isRequired,
};

export default IngredientCard;
