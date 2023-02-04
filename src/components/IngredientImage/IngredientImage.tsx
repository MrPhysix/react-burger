import React from 'react';
import style from './ingredient-image.module.css';

type TIngredientImage = {
  url: string,
  name: string,
  count?: number
}

function IngredientImage({ url, name, count }: TIngredientImage) {
  return (
    <li className={style.ingredient}>
      {count && (
      <p className={`${style.count} text text_type_digits-default`}>
        +
        {count}
      </p>
      )}
      <img className={style.image} src={url} alt={name} />
    </li>
  );
}

IngredientImage.defaultProps = {
  count: null,
};

export default IngredientImage;
