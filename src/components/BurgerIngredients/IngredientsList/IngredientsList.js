import React from 'react';
//
import IngredientCard from '../IngredientCard/IngredientCard';
import './IngredientsList.css';

function IngredientsList({ ingredients }) {
  const getTypeName = () => {
    switch (ingredients[0].type) {
      case 'bun':
        return 'Булки';
      case 'sauce':
        return 'Соусы';
      case 'main':
        return 'Основные';
      default:
        return 'Основные';
    }
  };

  return (
    <section className="ingredients-list">
      <h3 className="ingredients-list__title text text_type_main-medium">{getTypeName()}</h3>
      <ul className="ingredients-list__ul pt-6 pl-4 pr-4">
        {
        ingredients.map((item) => (
          <IngredientCard
            key={item.name}
            name={item.name}
            img={item.image}
            price={item.price}
          />
        ))
      }
      </ul>
    </section>
  );
}

export default IngredientsList;
