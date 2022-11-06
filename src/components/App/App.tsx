import React, { useEffect, useState, useCallback } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
//
import Header from '../Header/Header';
import Main from '../Main/Main';
//
import getInitialIngredients from '../../utils/api/indredients';
import { API_INGREDIENTS_URL } from '../../utils/const';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
//

function App() {
  // states
  const [data, setData] = useState(null);
  const [orderIsOpen, setOrderIsOpen] = useState(false);

  // callbacks
  const getInitialData = useCallback(
    () => {
      getInitialIngredients(API_INGREDIENTS_URL)
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    },
    [],
  );

  // handlers
  const handleOrderModal = {
    open: () => setOrderIsOpen(() => true),
    close: () => setOrderIsOpen(() => false),
  };

  // effects
  useEffect(() => getInitialData(), []);

  return (
    <>
      {
        orderIsOpen
        && <OrderDetails isOpen={orderIsOpen} handleClose={() => handleOrderModal.close()} />
      }
      <Header />
      {
        data
          ? <Main data={data} states={{ handleOrderModal }} />
          : <CirclesWithBar width="82" color="#4C4CFF" ariaLabel="loading" wrapperClass="loading-spinner" />
      }
    </>
  );
}

export default App;
