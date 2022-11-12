import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import getInitialIngredients from '../../utils/api/indredients';
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { IngredientsContext, ConstructorContext } from '../../utils/context';
//

function App() {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [error, setError] = useState(null); //

  // callbacks
  const getInitialData = useCallback(
    () => {
      setIsLoading(true);
      getInitialIngredients()
        .then((res) => {
          setIngredients(res);
        })
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

  if (error) return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  const ingredientsContextValue = useMemo(
    () => ({ ingredients, setIngredients }),
    [ingredients, setIngredients],
  );

  const constructorContextValue = useMemo(
    () => ({ selectedIngredients, setSelectedIngredients }),
    [selectedIngredients, setSelectedIngredients],
  );

  return (
    <IngredientsContext.Provider value={ingredientsContextValue}>
      <ConstructorContext.Provider value={constructorContextValue}>
        <Header />
        { isLoading
          ? <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
          : ingredients.length > 0 && <Main />}
      </ConstructorContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;
