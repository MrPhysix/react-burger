import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import Modal from '../Modal/Modal';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import { LoadingContext } from '../../utils/context';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
//

function App() {
  const dispatch = useDispatch();
  // states
  const { ingredients } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); //

  // callbacks
  // const getInitialData = useCallback(
  //   () => {
  //     setIsLoading(true);
  //     getInitialIngredients()
  //       .then((res) => {
  //         dispatch(getIngredients(res));
  //       })
  //       .catch((err) => setError(err))
  //       .finally(() => setIsLoading(false));
  //   },
  //   [],
  // );
  const getInitialData = useCallback(
    () => {
      dispatch(fetchIngredients());
    },
    [dispatch],
  );

  // handlers
  const handleErrorModalClose = () => {
    window.location.reload();
    setError(null);
  };

  // effects
  useEffect(() => getInitialData(), []);
  useEffect(() => {
    switch (ingredients.status) {
      case 'request':
        setIsLoading(true);
        break;
      case 'success':
        setIsLoading(false);
        setError(false);
        break;
      case 'error':
        setIsLoading(true);
        setError(true);
        break;
      default: {
        setIsLoading(false);
        setError(false);
      }
    }
  }, [ingredients.status]);

  if (error) return <Modal title="Произошла ошибка..." handleClose={handleErrorModalClose}><ErrorModal handleClose={handleErrorModalClose} /></Modal>;

  const loadingContextValue = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading],
  );

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <Header />
      { isLoading
        ? <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
        : ingredients.ingredients.length > 0 && <Main />}
    </LoadingContext.Provider>
  );
}

export default App;
