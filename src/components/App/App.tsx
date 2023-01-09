import React, { useEffect, useState, useCallback } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import getInitialIngredients from '../../utils/api/indredients';
import { API_INGREDIENTS_URL } from '../../utils/const';
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
//

function App() {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null); //

  // callbacks
  const getInitialData = useCallback(
    () => {
      setIsLoading(true);
      getInitialIngredients(API_INGREDIENTS_URL)
        .then((res) => setIngredients(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [],
  );

  // handlers
  const handleErrorModalClose = () => {
    window.location.reload();
    setError(null);
  };

  // effects
  useEffect(() => getInitialData(), []);

  return (
    <>
      {error && <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>}
      <Header />
      { isLoading
        ? <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
        : ingredients.length > 0 && <Main ingredients={ingredients} />}
      {/* что то по другому не придумаю как реализовать */}
    </>
  );
}

export default App;
