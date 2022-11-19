import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import getInitialIngredients from '../../utils/api/indredients';
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { IngredientsContext, ConstructorContext, LoadingContext } from '../../utils/context';
import { getIngredients } from '../../store/reducers/ingredientsSlice';
//

function App() {
  const dispatch = useDispatch();
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
          dispatch(getIngredients(res));
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

  const loadingContextValue = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading],
  );

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <IngredientsContext.Provider value={ingredientsContextValue}>
        <ConstructorContext.Provider value={constructorContextValue}>
          <Header />
          { isLoading
            ? <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
            : ingredients.length > 0 && <Main />}
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
