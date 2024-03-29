import React, { forwardRef } from 'react';
//
import { useSelector } from 'react-redux';
import IngredientCard from '../IngredientCard/IngredientCard';
import style from './ingredients-list.module.css';
import { TIngredient } from '../../../types';
import { RootState } from '../../../services';

interface IIngredientsList {
  ingredients: Array<TIngredient>,
  onIngredientClick: Function,
  name: string,
}

const IngredientsList = forwardRef((
  { ingredients, onIngredientClick, name }: IIngredientsList,
  ref: React.ElementRef<any> | React.LegacyRef<any> | any,
) => {
  const { constructorIngredients } = useSelector(
    (state: RootState) => state.constructorIngredients,
  );

  return (
    <section className="ingredients-list">
      <h3 ref={ref} className="ingredients-list__title text text_type_main-medium">{name}</h3>
      <ul className={`${style.ul} pt-6 pl-4 pr-4`}>
        {
          ingredients.map((item) => {
            const constructorMatches = constructorIngredients
              ?.filter((i: TIngredient) => i._id === item._id);

            return (
              <IngredientCard
                key={item._id}
                item={item}
                onClick={onIngredientClick}
                count={constructorMatches?.length || undefined}
              />
            );
          })
        }
      </ul>
    </section>
  );
});

export default IngredientsList;
