import React, {
  useEffect, useCallback,
} from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
//

function App() {
  const dispatch = useDispatch();
  // states
  const { ingredients } = useSelector((state) => state);

  // callbacks
  const getInitialData = useCallback(
    () => {
      dispatch(fetchIngredients());
    },
    [dispatch],
  );
  // handlers
  const handleErrorModalClose = () => {
    window.location.reload();
  };

  // effects
  useEffect(() => getInitialData(), []);

  if (ingredients.status === 'error') return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  return (
    <>
      <Header />
      { ingredients.status === 'request'
        ? <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
        : ingredients.ingredients.length > 0 && <Main />}
    </>
  );
}

export default App;
