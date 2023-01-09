import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/Modal/IngredientDetails/IngredientDetails';
import style from './ingredient-page.module.css';

function IngredientPage() {
  const { ingredients } = useSelector((state) => state);
  const { ingredientId } = useParams();

  const ingredient = useMemo(() => ingredients.ingredients.find(
    (item) => item._id === ingredientId,
  ), [ingredientId]);

  return (
    <section className={style.section}>
      <IngredientDetails ingredient={ingredient} />
    </section>
  );
}

export default IngredientPage;
