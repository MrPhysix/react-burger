import React from 'react';
import PropTypes from 'prop-types';
//
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function Main({ data }) {
  const style = {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  };

  return (
    <main style={style}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}

const dataObjectPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

Main.propTypes = {
  data: PropTypes.arrayOf(dataObjectPropTypes).isRequired,
};

export default Main;
